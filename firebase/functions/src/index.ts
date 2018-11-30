import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.createProfile = functions.auth.user()
//     .onCreate((userRecord, context) => {
//         const id = userRecord.uid;
//         const user = {
//             displayName: userRecord.displayName,
//             photoURL: userRecord.photoURL,
//             email: userRecord.email,
//             created: context.timestamp
//         };
//
//         return admin
//             .firestore()
//             .doc(`users/${id}`)
//             .set(user);
//     });

// exports.assignExercisesNumber = functions.firestore
//     .document(`tests/{testId}/exercises/{exerciseId}`)
//     .onWrite(async (event, context) => {
//         const testId = context.params.testId;
//         const testExerciseRef = await admin.firestore().collection(`tests/${testId}/exercises`);
//         return testExerciseRef.get()
//             .then(res => {
//                 if (res && res.size !== 'undefined') {
//                  return admin.firestore().doc(`tests/${testId}`).update({exercisesNumber: res.size})
//                 }
//             })
//             .catch(error => {
//                 throw new Error(error);
//             });
//     });


// exports.increaseTestExercisesNumberOnAddExercise = functions.firestore
//     .document(`tests/{testId}/exercises/{exerciseId}`)
//     .onCreate(async (snap, context) => {
//
//         const testId: string = context.params.testId;
//         const testRef = await admin.firestore().doc(`tests/${testId}`);
//
//         return testRef
//             .get()
//             .then(documentSnapshot => {
//                 if (documentSnapshot.exists) {
//                     const newTestExerciseNumber = documentSnapshot.data().exercisesNumber + 1;
//                     const writeBatch = admin.firestore().batch();
//
//                     writeBatch.update(testRef, {exercisesNumber: newTestExerciseNumber});
//                     writeBatch.set(snap.ref, snap.data());
//
//                     return writeBatch.commit();
//                 }
//             })
//             .catch(error => console.error(error));
//     });
//
// exports.decreaseTestExercisesNumberOnDeleteExercise = functions.firestore
//     .document(`tests/{testId}/exercises/{exerciseId}`)
//     .onDelete(async (snap, context) => {
//
//         const testId: string = context.params.testId;
//         const testRef = await admin.firestore().doc(`tests/${testId}`);
//
//         return testRef
//             .get()
//             .then(documentSnapshot => {
//                 if (documentSnapshot.exists) {
//                     const newTestExerciseNumber = documentSnapshot.data().exercisesNumber - 1;
//                     if (newTestExerciseNumber < 0) {
//                         throw new Error('Test exercises number (onDelete) error.');
//                     }
//                     const writeBatch = admin.firestore().batch();
//
//                     writeBatch.update(testRef, {exercisesNumber: newTestExerciseNumber});
//                     writeBatch.delete(snap.ref);
//
//                     return writeBatch.commit();
//                 }
//             })
//             .catch(error => console.error(error));
//     });