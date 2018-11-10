import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.increaseTestExercisesNumberOnAddExercise = functions.firestore
    .document(`tests/{testId}/exercises/{exerciseId}`)
    .onCreate(async (snap, context) => {

        const testId: string = context.params.testId;
        const testRef = await admin.firestore().doc(`tests/${testId}`);

        return testRef
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const newTestExerciseNumber = documentSnapshot.data().exercisesNumber + 1;
                    const writeBatch = admin.firestore().batch();

                    writeBatch.update(testRef, {exercisesNumber: newTestExerciseNumber});
                    writeBatch.set(snap.ref, snap.data());

                    return writeBatch.commit();
                }
            })
            .catch(error => console.error(error));
    });

exports.increaseTestExercisesNumberOnDeleteExercise = functions.firestore
    .document(`tests/{testId}/exercises/{exerciseId}`)
    .onDelete(async (snap, context) => {

        const testId: string = context.params.testId;
        const testRef = await admin.firestore().doc(`tests/${testId}`);

        return testRef
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const newTestExerciseNumber = documentSnapshot.data().exercisesNumber - 1;
                    if(newTestExerciseNumber < 0) {
                        throw new Error('Test exercises number (onDelete) error.');
                    }
                    const writeBatch = admin.firestore().batch();

                    writeBatch.update(testRef, {exercisesNumber: newTestExerciseNumber});
                    writeBatch.delete(snap.ref);

                    return writeBatch.commit();
                }
            })
            .catch(error => console.error(error));
    });