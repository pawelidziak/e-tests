/**
 *    Method use to create cube strips
 */
export class CubeUtils {

  public static createCubeContainer(scale = 1) {
    if (scale < 0.1) {
      scale = 0.1;
    }
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.left = `${Math.floor(Math.random() * 100)}%`;
    outer.style.top = `${Math.floor(Math.random() * 100)}%`;
    outer.style.transform = `scaleX(${scale}) scaleY(${scale}) scaleZ(${scale})`;
    return outer;
  }

  public static createCubeShadow() {
    const shadow = document.createElement('div');
    shadow.style.background = '#07427a';
    shadow.style.top = '40%';
    shadow.style.position = 'absolute';
    shadow.style.width = '100%';
    shadow.style.height = '100%';
    shadow.style.filter = 'blur(72px)';
    return shadow;
  }

  public static createCube(color: string) {
    const cube = document.createElement('div');
    cube.style.position = 'absolute';
    cube.style.width = `100%`;
    cube.style.height = `100%`;
    cube.style.transformStyle = 'preserve-3d';
    // cube.style.animation = `${animName} ${animDuration}s infinite linear`;

    cube.appendChild(this.createFrontSquare(color));
    cube.appendChild(this.createBackSquare(color));
    cube.appendChild(this.createTopSquare(color));
    cube.appendChild(this.createBottomSquare(color));
    cube.appendChild(this.createLeftSquare(color));
    cube.appendChild(this.createRightSquare(color));

    return cube;
  }

  /**
   *  CREATE SQUARES
   */
  private static createSquare() {
    const square = document.createElement('div');
    square.style.position = 'absolute';
    square.style.width = '50px';
    square.style.height = '50px';
    return square;
  }

  public static createFrontSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateY(0deg) translateZ(25px)';
    square.style.background = color;
    square.style.filter = 'brightness(100%)';
    return square;
  }

  public static createBackSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateY(-180deg) translateZ(25px)';
    square.style.background = color;
    square.style.filter = 'brightness(95%)';
    return square;
  }

  private static createTopSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateX(90deg) translateZ(25px)';
    square.style.background = color;
    square.style.filter = 'brightness(90%)';
    return square;
  }

  private static createBottomSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateX(-90deg) translateZ(25px)';
    square.style.background = color;
    square.style.filter = 'brightness(85%)';
    return square;
  }

  private static createLeftSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateY(-90deg) translateZ(25px)';
    square.style.background = color;
    square.style.filter = 'brightness(80%)';
    return square;
  }

  private static createRightSquare(color: string) {
    const square = this.createSquare();
    square.style.transform = 'rotateY(90deg) translateZ(25px)';
    square.style.background = color;
    return square;
  }

}
