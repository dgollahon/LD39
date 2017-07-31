const canvas: any = document.getElementById("canvas");
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Game constants
const WIDTH = 720;
const HEIGHT = 480;
const TILE_SIZE = 48;
const HALF_TILE = TILE_SIZE / 2;

const JUMP_SOUND = new Audio("jump3.mp3");
const HIT_SOUND = new Audio("hit.mp3");
const LASER_SOUND = new Audio("laser.mp3");
const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src =
  "data:image/png;base64,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9t228cx8NdX7z/adnVttVsesexLvS5yrytoD537Frv72d7fi/Vn3z7rnrrPvto1n5qup3n+27+zcarM6Zt1z19337+7RPw9wceJcVdYeOPcrdvW3v7sV78+6f9Y9d519t208M19N9f6zfWfnVpvVMeuexPsS56qy9sC5X7Grv/3drXh/1v2z7rnr7Ltt45n5aqr3n+07O7farI5Z99x19/27e/T3X+BCyrnqrD1w7nNs9e9v1r1t44z7VvmVzp7q/dX7UtVOdhHnq7L2wLnPsdW/v1n3to0z7lvlVzp7qvdX70u/0jnCnyNxrufuHv39F7iQcq46aw+c+xxb/fubdW/bOOO+VX6ls6d6f/W+VLWTXcT5qqw9cO5zbPXvb9a9beOM+1b5lc6e6v3V+9KvdI7w50ic67m7R3//BS5M+f3z72L/LATO7WaNgXO7WWPgXFXWHji326/1Jc69zZoC5z7/DvbPQuDcbtYYOLebNQbOVWXtgXO7/Vpf4lx19jO0OE+2Ezg38vdfyGUhv3/+XeyfhcC53awxcG43awycq8raA+d2+7W+xLm3WVPg3Offwf5ZCJzbzRoD53azxsC5qqw9cG63X+tLnKvOfoYW58l2AueO/fnH/wNBGuk56/Y/AgAAAABJRU5ErkJggg==";
const ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAwCAYAAAD+WvNWAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAPaSURBVHhe7dfRjRw3EEXRDUX/TkLROA4DjsL5OAlFYMBJjE0NHsC9erXNYnOHtQA/zkdX19bcwQAC9PZ4PKb8/v23R8PnaK7nKqLOaK7nKqLOaK7n1exwRBQazfVcRdQZzfVcRdQZzfW8mh2O6GP7wOiZ892iruiZ892iruiZ81XscEQUFj1zvlvUFT1zvlvUFT1zvoodZjBwFO/s4tpG8M4urm0E78yywwwXN4J3dnFtI3hnF9c2gndm2eEIF5XBe6/mmjJ479VcUwbvzbLDES4qg/dezTVl8N6ruaYM3ptlhxkM++fvPz+kPd7ZpW9vXHNPe7yzS9/euOae9nhnlh1m9PGNi+5pj3d26dsb19zTHu/s0rc3rrmnPd6ZZYcj+uieQt/+P93wmXd2ce3N6c+xwxEuvnn1F5jl2pvTn2OHGQwfxTu7nP577DDj/AB77e63w4/wn8Kv9gOc/if9/V12+JFqXyDr9D/p7++yQ0fhkT++fXvHRTd6z/ufjb3UtzeuvdF73v9s7KW+vXHtjd7z/iw7dBhMfXzj4hu95/3Pxl7q2xvX3ug973829lLf3rj2Ru95f5YdOgr968e/P0XhWfwc0X3OZ+ne6X+PnyO6zznZoaOD5wd4j58jus/5LN2r1m+Hjg7yC/CfSM1XY0+W7pz+OewRO3R06PwAc9iTpTvV+u3Q0aGrLyB6vwp7snTn9M9hj9iho0PnB5jDnizdqdZvh44O8QuQ+zIN93SX7zVfTfdP/5Pu8r3mo+zQ0QecH+BJd/le89V0v1q/HTr6gKsvIPpvYv8lXGg0X033T//zve5G81F26OgDzg/wfK+70Xw13a/Wb4eOPiD6AtpTeER7xDur6f7p//V2wzuj7NDRB5wf4NfbDe+spvvV+u3Q0QdEsnuvxg7K7r0aOyi7t4odOgyh7N6rsYOye6/GDsrurWKHdzCYuF8Ne4n71bCXuH+XHd7BYOJ+Newl7lfDXuL+XXa4AsOFe1WxW7hXFbuFe3fZ4QoMF+5VxW7hXlXsJu7PssMVGCzcq4rdxP1q2Evcn2WHKzBYuFcVu4n71bCXuD/LDu9gqHCvKnZH+HdVXHVevc+ywzsYKNyrit0R/l0VV51X77Ps8A4GCveqirqjeTVXnVfvs+zwDgYK96qKuqN5NVedV++z7HAGw4j7VUW9mhP3dhntGt0bZYczGEbcryrq1Zy4t8to1+jeKDucwTDifjVfrVey3dn9K3Y4g2HE/Wq+Wq9ku7P7V+xwBYYK96pgp3CvGvYK94R7wr1RdrgCA4V7VbBTuFcNe4V7wj3h3pjH238FsupASuu6XgAAAABJRU5ErkJggg==";
const DYING_IMAGE = new Image();
DYING_IMAGE.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAwCAYAAAD+WvNWAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAATLSURBVHhe7dfhqVw3EAXgV8r7nyZcjeswpIrU89yEKwikiXVGcJbZs0erGUkrKeEOfGCNZufKcIjJx+126/L92x83w+daH+eDoPiMqs0d4evr62b4XOvjPJtsRtSCUuvjfBAUn1G1uSPUglLr4zybbEb4sPiA1M7cPwAX91tzW/mw+IDUztyfRTYjasGonbl/AC7ut+a2qgWjdub+LLKZwQGJ4j0b9ZbatRwHJIr39JLNDBWOCN6zUW+pXcupcETwnl6yGaFCkcH7NhgttXMZFYoM3tdLNiNUKDJ43wajpXYuo0KRwft6yWYGB+Pvn3++hDnes1FvqV3LqXBE8J5espnhw2NUaDzM8Z6NekvtWk6FI4L39JLNCB8aD0H5+He14TPv2ehlufeWOu39KhQe3stn3jNKNiNUeMwVoDV8WBS8l8+8Z5RsZnBwonjPRr2ldi3nQ5PBe3rJZsYVoL1UOCJ4Ty/ZfIX/U/hfCxC/3/7QWfedK/H7VTgi8PtRsvkK/wWuAK3F71fhiMDvR8mmgofX/Pj8fKBCY3DP+9+N38s66ukb78TvZSokr/D+XrKp8IOZD49R4TG45/3vxu9lHfX0jXfi9zIVkld4fy/ZVPDQv379U+DsQ9ODvwPYz/1ebl8pPg/Uw3fA7X+66+H2lcJZhSPDVinue093nmwqWHgF6KkevgNu/9NdD7evFM4qFBm2SnHfe7rzZFPBQg4Q/xOF/mz8niy3pxSfUejPZqtHuD2lcOZAoD+bfVKRTQWLrgD1sdUj3J5SOP/vAgS4n4Xfk+X2lOIzF+5nsZUj3J5SOHOAAPez2CcV2VSw6ApQH1s5wu0phbMKj8H9LPZJRTYVLOIAMRUmw3PYy/foz+b2l8KZ1UrMYXcp0Z/K7S+FM1NhMjxnKwzfox8lmwo+cAXoPofdpUR/Kre/FM7Mh8bjOVth+B79KNlU8IFWgAD/m+5DpIJS68/m9pfCuaZW7h67S4n+VG5/KZxrfHg83NsKU+tHyaaCD1wBut9jdynRn8rtL4VzjQ+Nh3tbYWr9KNlU8IFagDCH4NRgjvGe2dz+Uji7PmZbhbkHYs9Ubn8pnF2/zPmwKJhjvCdKNhV84ArQ414Qe6Zy+0vh7PplToXGwxzjPVGyqeADNdm51fgdzM226r5zJX4vw5wKjYe5WWRT4Qez7Nxq/A7mZlt137kSv5dhToXGw9wssjmC/2KM5w/UKvWbY6jQeDw/SjZHcGAYzx+oVeo3x1Ch8Xh+lGzOwMEBnjtYrdTscVR4DM+Nks0ZODiM5w/UKvWbY6jweDzfSzZn4MAwnj9Qq9RvjqFC4/F8L9mcgQPDeP5ArVK/OYYKjcfzvWRzRCsorfsDcGXvt2oFpXWfJZsjWgFp3R+AK3u/VSsgrfss2RzRCkjr/gBc2futWgFp3WfJ5ohWQFr3B+DK3m/VCkjrPks2e0SDEZ3bgEvNGC41s1w0GNG5KNnsEQ1GdG4DLjVjuNTMctFgROeiZDMjG4js/AJcasbjUjPLZAORnW+RzYxsILLzC3CpGY9LzSyTDUR2vkU2MzgQwHPAc8BzC9VKzZpaqdm340AAz4GaNTwXJZsZHATgOeA54LmFaqVmTa3U7NupMBieAzVreC7m9vEbjTgEXchp/8AAAAAASUVORK5CYII=";
const TILE_SET = new Image();
TILE_SET.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAAwCAYAAACR1EfmAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAptSURBVHhe7dbhbfa4EQTgr7t0koruT1pIR2khKcIHBNgDb27GIt9drkjf/HgAQ+CQq7Fs6dfX19ef/Pa/f3+dDOdFLHOSp3n/9Z///t+vf/wzJfap3g/n/Wmq+6raL7CZRyzzier5Yx+c9+nvwWph34hlrA72HdhaMyWem+seJJwXscxJnuatfmFW74fz/jTVfVXtF9jMI5b5RPX8sQ/O+/T3YLWwb8QyVgf7DmytmRLPzbUPUMx9+/x4vfqFWb0fzvvTVPdVtR/CudmajOr5Yx+cW/0d2F7Ru/t/h3u3Ctf+Acfct8+P16tfmNX74bw/TXVfVfshnJutyaieP/bBudXfge0Vvbv/d7h3qyA/IE6F8yKWOQmbeRTr2EtwxngWwzIzIq/mvZW6H9bBjHFvhmVOwmYescyMyGPfaDzL6rHORyxjdbDv+JAz+4Q/4JqxmUexjr0EZ4xnMSwzI/Jq3lup+2EdzBj3ZljmJGzmEcvMiDz2jcazrB7rfMQyVgf7xhey2Qr5Acf+Cb9J/QGgv/v8Kl+1L87L1t4E76eqp9nrp9k1f+Sxb5Q9xzj3/y7VP76QzVb4A65J1/wqX7UvzsvW3gTvp6qn2eun2TV/5LFvlD3HOPf/LtU/vpDNVvgDrknX/CpftS/Oy9beBO+nqqfZ66fZNX/ksW+UPcc49/8u1T++kM1W+AOuSdf8Kl+1L87L1t4E76eqp9nrp9k1f+Sxb5Q9xzj3/y7VP76QzVb4A65J1/yRV1hmRuRxXrb2Jng/VT0pLHMSNvOIZWZEHvtG2XOMc//vUv3jC9lshT/gmnTNH3mFZWZEHudla2+C91PVk8IyJ2Ezj1hmRuSxb5Q9xzj3/y7VP76QzVZs/4CL/RBb+53I4bzo0/1365pf5av2xXnZ2pvg/VT1NHv9NLvmjzz2jbLnGOf+36X6xxey2Qp/wDXpml/lq/bFednam+D9VPU0e/00u+aPPPaNsucY5/7fpfrHF7LZCn/ANemaX+Wr9sV52dqb4P1U9TR7/TS75o889o2y5xjn/t+l+scXstkKf8A16Zpf5av2xXnZ2pvg/VT1NHv9NLvmjzz2jbLnGOf+36X6xxey2Qp/wDXpml/lq/bFednam+D9VPU0e/00u+aPPPaNsucY5/7fpfrHF7LZCn/ANemaX+Wr9sV52dqb4P1U9TR7/TS75o889o2y5xjn/t+l+scXstkKf8A16Zpf5av2xXnZ2pvg/VT1NHv9NLvmjzz2jbLnGOf+36X6xxey2Qp/wDXpml/lq/bFednam+D9VPU0e/00u+aPPPaNsucY5/7fpfrHF7LZCn/ANemaP/IKy8yIPM6r1p0K58X7UetmjWftwM4csUwlduaMyGPfqOqcXdiZI5apxM6cEXnW+Sh7Toh9dmFnjlimEjvzO5HDvvGFbLbCH3BNuuaPvMIyMyKP86p1p8J58X7UulnjWTuwM0csU4mdOSPy2DeqOmcXduaIZSqxM2dEnnU+yp4TYp9d2JkjlqnEzvxO5LBvfCGbrSj7gIvcLLbHdyKH86JP99+ta36Vr9pXzYtUHq+j3Xmk7gfzs1R+dt+n/CyVx+som1cij32jqnNmr6On/CyVx+som1cizzoffXpO5JBah9fRU36WyuN19JRHuA7FOuwbX8hmK/wB16RrfpWv2lfNi1Qer6PdeaTuB/OzVH5236f8LJXH6yibVyKPfaOqc2avo6f8LJXH6yibVyLPOh99ek7kkFqH19FTfpbK43X0lEe4DsU67BtfyGYr/AHXpGt+la/aV82LVB6vo915pO4H87NUfnbfp/wslcfrKJtXIo99o6pzZq+jp/wslcfrKJtXIs86H316TuSQWofX0VN+lsrjdfSUR7gOxTrsG1/IZiv8Adeka36Vr9pXzYtUHq+j3Xmk7gfzs1R+dt+n/CyVx+som1cij32jqnNmr6On/CyVx+som1cizzoffXpO5JBah9fRU36WyuN19JRHuA7FOuwbX8hmK/wB16Rr/sgrLDMj8jivWncqnBfvR62bNZ61AztzxDKV2JkzIo99o6pzdmFnjlimEjtzRuRZ56PsOSH22YWdOWKZSuzM70QO+8YXstkKf8A16Zo/8grLzIg8zqvWnQrnxftR62aNZ+3AzhyxTCV25ozIY9+o6pxd2JkjlqnEzpwRedb5KHtOiH12YWeOWKYSO/M7kcO+8YVstmL7Bxxb+4nYD+dF1edW6Zpf5av2xXnZ2pvg/WR7Mk49Pyjbv8pn9+2ya/7Is85H2XOMU/3jC9lshT/gmnTNr/JV++K8bO1N8H6yPRmnnh+U7V/ls/t22TV/5Fnno+w5xqn+8YVstsIfcE265lf5qn1xXrb2Jng/2Z6MU88Pyvav8tl9u+yaP/Ks81H2HONU//hCNlvhD7gmXfOrfNW+OC9bexO8n2xPxqnnB2X7V/nsvl12zR951vkoe45xqn98IZut8Adck675Vb5qX5yXrb0J3k+2J+PU84Oy/at8dt8uu+aPPOt8lD3HONU/vpDNVvgDrknX/CpftS/Oy9beBO8n25Nx6vlB2f5VPrtvl13zR551PsqeY5zqH1/IZiv8Adeka36Vr9oX52Vrb4L3k+3JOPX8oGz/Kp/dt8uu+SPPOh9lzzFO9Y8vZLMV/oBr0jW/ylfti/OytTfB+8n2ZJx6flC2f5XP7ttl1/yRZ52PsucYp/rHF7LZCn/ANemaP/IKy8yIPM7L1t4E7yfbk3Hq+UHZ/iOvsMxJ2MwjlpkRedb5KHuOcap/fCGbrfAHXJOu+SOvsMyMyOO8bO1N8H6yPRmnnh+U7T/yCsuchM08YpkZkWedj7LnGKf6xxey2YqyD7jd1B8A+rvPr/JV++K8bO1N8H6yPRmnnh+U7V/ls/t22TV/5Fnno+w5xqn+8YVstsIfcE265lf5qn1xXrb2Jng/2Z6MU88Pyvav8tl9u+yaP/Ks81H2HONU//hCNlvhD7gmXfOrfNW+OC9bexO8n2xPxqnnB2X7V/nsvl12zR951vkoe45xqn98IZut8Adck675Vb5qX5yXrb0J3k+2J+PU84Oy/at8dt8uu+aPPOt8lD3HONU/vpDNVsgPuFPhvIhlTsJmHsU69k9gxngWwzIzIq/mvdVPu5/TYd8o1rFncMZ4FsMyJ2Ezj1hmRuRZ56PxLKuHfeML2WyFP+CasZlHsY79E54xnsWwzIzIq3lv9dPu53TYN4p17BmcMZ7FsMxJ2MwjlpkRedb5aDzL6mHf+EI2W/HHD/hgnS7mvn1+vB5/6Oyf8Irxn0blfjjv7dTvwfZSvVc/r1X7IZybrcmonj/2wbnV78H2it7NMv74gT1kJ4u5b58fr1f/w67eD+e9nfo92F6q9+rntWo/hHOzNRnV88c+OLf6Pdhe0btZxl8usIftJDgvYpmTPM1b/Q+7ej+c93ZPvw+r9dR39fNatV/AeRHLfKJ6/tgH5336fVgt7Nss4y8X2EN3EpwXscxJnuat/oddvR/Oe7un34fVeuq7+nmt2i/gvIhlPlE9f+yD8z79PqwW9m32ua9fvwOacFoLLbUihQAAAABJRU5ErkJggg==";

class Tile {
  x: number;
  y: number;
  tileSet: Sprite;
  upperBlocking: boolean;

  constructor(x: number, y: number, frame: number) {
    this.x = x;
    this.y = y;
    this.tileSet = new Sprite(TILE_SET, frame, -1);
    this.upperBlocking = !(frame >= 10);
  }

  public draw(context: CanvasRenderingContext2D, xShift: number) {
    this.tileSet.draw(context, this.x + xShift, this.y, false);
  }

  public isBlocking(): boolean {
    return true;
  }
}

class EmptyTile extends Tile {
  readonly upperBlocking = false;
  constructor(x: number, y: number) {
    super(x, y, -1);
  }
  public draw(context: CanvasRenderingContext2D) {}

  public isBlocking(): boolean {
    return false;
  }
}

class Sprite {
  private readonly image: HTMLImageElement;
  frame: number;
  private ticks: number;
  private animationFactor: number;
  private frames: number;

  constructor(image: HTMLImageElement, frame: number, animationFactor: number) {
    this.image = image;
    this.frame = frame;
    this.ticks = 0;
    this.animationFactor = animationFactor;
    this.frames = image.width / TILE_SIZE;
  }

  public animate(limit?: number) {
    ++this.ticks;
    this.ticks %= this.animationFactor * (limit || this.frames);
    this.frame = this.ticks / this.animationFactor;
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number, reverse: boolean) {
    const drawX = Math.floor(x - HALF_TILE);
    const drawY = Math.floor(y - HALF_TILE);
    if (reverse) {
      context.save();
      context.translate(drawX, drawY);
      context.scale(-1, 1);
      context.drawImage(
        this.image,
        TILE_SIZE * Math.floor(this.frame),
        0,
        TILE_SIZE,
        TILE_SIZE,
        -TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE
      );
      context.restore();
    } else {
      context.drawImage(
        this.image,
        TILE_SIZE * Math.floor(this.frame),
        0,
        TILE_SIZE,
        TILE_SIZE,
        drawX,
        drawY,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
}

class Level {
  static readonly data2 = [
    // "633333333333333333333333333337",
    // "2                            2",
    // "2          <->               2",
    // "2    0       <-->       <--->2",
    // "2    00                      2",
    // "2 <>     <------->           2",
    // "2                            2",
    // "2    00   <--------->        2",
    // "2   0000                     2",
    // "433333333333333333333333333335"
    "633333333333333333333333333333333333333333333333333333333333333333333333333333333333",
    "2     1                                                      1       1              ",
    "2     1     e      e                                         1       1  eeee  833337",
    "2   1 1   <--->  <--->                                       11111111111<-->11111112",
    "2  01 1   e        e                           0   111 -  -  1  eee                2",
    "2   1  <----->111111111                <--->        e        1<---->1111111111111112",
    "20  1         11      111                     11111111111    1                     2",
    "2   1 <---->1111        111    0   0   0   0  1         1    111111111111111111111 2",
    "2  01  e      11          11   e   e   e   e    eeeeee  1  e                       2",
    "433333333333333333333333333333333333333333333333333333333333333333333333333333333335"
  ];
  static readonly mapWidth = Level.data2[0].length * TILE_SIZE;

  readonly tiles: Tile[][];

  constructor(enemies: Enemy[]) {
    let tileY = HALF_TILE;

    this.tiles = Level.data2.map(row => {
      const columns = row.length;
      const columnTiles: Tile[] = [];

      for (let col = 0; col < columns; ++col) {
        let tileX = col * TILE_SIZE + HALF_TILE;
        let tile = null;
        if (row[col] === " ") {
          tile = new EmptyTile(tileX, tileY);
        } else if (row[col] === "<") {
          tile = new Tile(tileX, tileY, 10);
        } else if (row[col] === "-") {
          tile = new Tile(tileX, tileY, 11);
        } else if (row[col] === ">") {
          tile = new Tile(tileX, tileY, 12);
        } else if (row[col] === "e") {
          enemies.push(new Enemy(tileX, tileY, 2));
          tile = new EmptyTile(tileX, tileY);
        } else {
          tile = new Tile(tileX, tileY, parseInt(row[col]));
        }
        columnTiles.push(tile);
      }

      tileY += TILE_SIZE;

      return columnTiles;
    });
  }

  public draw(context: CanvasRenderingContext2D, player: Player) {
    let y = 0;

    const xShift = player.xShift();

    while (y < HEIGHT) {
      const start = -xShift;
      const row = this.horizontalTiles(start, start + WIDTH, y);
      row.forEach(col => col.draw(context, xShift));

      y += TILE_SIZE;
    }
  }

  public leftCollision(leftX: number, rightX: number, y: number): number | null {
    let blockingTiles = this.horizontalTiles(leftX, rightX, y).filter(
      tile => tile.isBlocking() && tile.upperBlocking
    );

    let block = blockingTiles[blockingTiles.length - 1];

    if (block) {
      return block.x + TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public rightCollision(leftX: number, rightX: number, y: number): number | null {
    let block = this.horizontalTiles(leftX, rightX, y).filter(
      tile => tile.isBlocking() && tile.upperBlocking
    )[0];

    if (block) {
      return block.x - TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public bottomCollision(topY: number, bottomY: number, x: number): number | null {
    let block = this.verticalTiles(topY, bottomY, x).filter(tile => tile.isBlocking())[0];

    if (block) {
      return block.y - HALF_TILE;
    } else {
      return null;
    }
  }

  public topCollision(topY: number, bottomY: number, x: number): number | null {
    let blockingTiles = this.verticalTiles(topY, bottomY, x).filter(
      tile => tile.upperBlocking
    );

    let block = blockingTiles[blockingTiles.length - 1];

    if (block) {
      return block.y + TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public horizontalTiles(leftX: number, rightX: number, y: number): Tile[] {
    const tiles = [];

    let x = leftX;
    let remainingChecks = true;

    while (true) {
      let tile = this.tileFor(x, y);
      tile && tiles.push(tile);

      if (x === rightX) {
        break;
      }

      x += TILE_SIZE;

      if (x > rightX) {
        x = rightX;
      }
    }

    return tiles;
  }

  private verticalTiles(topY: number, bottomY: number, x: number): Tile[] {
    const tiles = [];

    let y = topY;
    let remainingChecks = true;

    while (true) {
      let tile = this.tileFor(x, y);
      tile && tiles.push(tile);

      if (y === bottomY) {
        break;
      }

      y += TILE_SIZE;

      if (y > bottomY) {
        y = bottomY;
      }
    }

    return tiles;
  }

  private tileFor(x: number, y: number): Tile {
    return this.tiles[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
  }
}

class Enemy {
  x: number;
  y: number;
  leftX: number;
  rightX: number;
  right: boolean;
  sprite: Sprite;
  dyingSprite: Sprite;
  firing: number | false;
  readonly speed = 1.3;
  readonly range = 4 * TILE_SIZE;
  dead: boolean;
  sound: any;
  hitSound: any;
  dying: number | null;

  constructor(x: number, y: number, range: number) {
    this.x = x;
    this.y = y;
    this.leftX = x - range * TILE_SIZE;
    this.rightX = x + range * TILE_SIZE;
    this.right = false;
    this.sprite = new Sprite(ENEMY_IMAGE, 1, 10);
    this.firing = false;
    this.dead = false;
    this.dying = null;
    this.dyingSprite = new Sprite(DYING_IMAGE, 0, 5);
    this.sound = new Audio("laser.mp3");
    this.hitSound = new Audio("hit.mp3");
  }

  public draw(context: CanvasRenderingContext2D, timestamp: number, player: Player) {
    context.save();
    context.translate(player.xShift(), 0);

    if (this.dying) {
      this.dyingSprite.draw(context, this.x, this.y, !this.right);
    } else {
      this.sprite.draw(context, this.x, this.y, !this.right);
    }
    const laserY = Math.floor(this.y - 2);
    const laserX = Math.floor(this.x + 16 * (this.right ? 1 : -1));
    const tankX = Math.floor(this.x + 11 * (this.right ? -1 : 1));
    if (this.firing) {
      context.save();
      context.beginPath();
      context.strokeStyle = "#00AAFF";
      context.moveTo(laserX, laserY);
      context.lineTo(this.firing, laserY);
      context.stroke();
      context.strokeStyle = "#00FFFF";
      context.moveTo(laserX, laserY);
      context.lineTo(this.firing, laserY);
      context.setLineDash([4, 4]);
      context.lineDashOffset = Math.floor(timestamp) % 16 * 2;
      context.stroke();
      context.restore();
      context.save();
      context.moveTo(tankX, this.y - 6);
      context.lineTo(tankX, this.y + 6);
      const strobe = 32 * (Math.floor(timestamp) % 4);
      context.strokeStyle = `rgb(${strobe + 128},${strobe + 128},${strobe + 128})`;
      context.stroke();
      context.restore();
    }
    context.restore();
  }

  public update(player: Player): void {
    if (this.dying) {
      if (--this.dying > 0) {
        this.dyingSprite.animate();
        return;
      } else {
        this.dead = true;
        return;
      }
    }
    if (
      Math.abs(this.y - player.y) < HALF_TILE &&
      Math.abs(this.x - player.x) < HALF_TILE
    ) {
      this.hitSound.play();
      this.dying = 20;
      this.firing = false;
      this.sound.currentTime = 2.35102;
    }

    if (this.firing) {
      if (
        this.sound.currentTime === 0 ||
        Math.abs(this.sound.currentTime - 2.35102) < 0.05
      ) {
        this.sound.currentTime = 0;
        this.sound.play();
      }
      this.sprite.frame = 2;
      player.health -= 1;
    } else {
      this.sound.currentTime = 2.35102;
      this.sprite.animate();
    }

    const yRange = Math.abs(this.y - player.y) < HALF_TILE;
    // right
    if (
      yRange &&
      this.right &&
      player.x - this.range < this.x &&
      player.x > this.x + TILE_SIZE / 3
    ) {
      if (
        level
          .horizontalTiles(Math.min(this.x, player.x), Math.max(this.x, player.x), this.y)
          .filter(block => block.isBlocking()).length !== 0
      ) {
        this.firing = false;
      } else {
        this.firing = player.x;
      }
      // left
    } else if (
      yRange &&
      !this.right &&
      player.x + this.range > this.x &&
      player.x < this.x - TILE_SIZE / 3
    ) {
      if (
        level
          .horizontalTiles(Math.min(this.x, player.x), Math.max(this.x, player.x), this.y)
          .filter(block => block.isBlocking()).length !== 0
      ) {
        this.firing = false;
      } else {
        this.firing = player.x;
      }
    } else {
      this.firing = false;
    }

    if (!this.firing) {
      if (this.right) {
        if (this.x < this.rightX) {
          this.x += this.speed;
        } else {
          this.right = false;
        }
      } else {
        if (this.x > this.leftX) {
          this.x -= this.speed;
        } else {
          this.right = true;
        }
      }
    }
  }
}

// Supporting classes
class Player {
  x: number;
  y: number;
  ySpeed: number;
  xSpeed: number;
  jumping: boolean;
  faceRight: boolean;
  running: boolean;
  sprite: Sprite;
  health: number;
  won: boolean;

  constructor() {
    this.x = TILE_SIZE + HALF_TILE;
    this.y = HEIGHT - 2 * TILE_SIZE;
    this.ySpeed = 0;
    this.xSpeed = 5;
    this.jumping = false;
    this.faceRight = true;
    this.running = false;
    this.sprite = new Sprite(PLAYER_IMAGE, 16, 4);
    this.health = 100;
    this.won = false;
  }

  public xShift() {
    if (this.x < WIDTH / 2) {
      return 0;
    } else if (this.x > Level.mapWidth - WIDTH / 2) {
      return -1 * (Level.mapWidth - WIDTH);
    } else {
      return WIDTH / 2 - this.x;
    }
  }

  public draw() {
    let drawX = this.x < WIDTH / 2 ? this.x : WIDTH / 2;
    if (this.x > Level.mapWidth - WIDTH / 2) {
      drawX = this.x - (Level.mapWidth - WIDTH);
    }
    this.sprite.draw(context, drawX, this.y, !this.faceRight);
  }

  public update(keyState: KeyState, level: Level): void {
    if (this.x > Level.mapWidth - TILE_SIZE && this.y < TILE_SIZE * 2) {
      this.won = true;
      return;
    }
    if (keyState.isDown(KeyCode.A)) {
      this.running = true;
      let newX = this.x - this.xSpeed;

      let collision = level.leftCollision(this.x - HALF_TILE, newX - HALF_TILE, this.y);

      if (collision) {
        this.x = collision + HALF_TILE;
      } else {
        this.x = newX;
      }
      this.faceRight = false;
    } else if (keyState.isDown(KeyCode.D)) {
      this.running = true;
      const newX = this.x + this.xSpeed;

      let collision = level.rightCollision(this.x + HALF_TILE, newX + HALF_TILE, this.y);

      if (collision) {
        this.x = collision - HALF_TILE;
      } else {
        this.x = newX;
      }
      this.faceRight = true;
    } else {
      this.running = false;
      this.sprite.frame = 16;
    }

    if (keyState.isDown(KeyCode.W) && !this.jumping) {
      if (
        JUMP_SOUND.currentTime === 0 ||
        Math.abs(JUMP_SOUND.currentTime - JUMP_SOUND.duration) < 0.025
      ) {
        JUMP_SOUND.currentTime = 0;
        JUMP_SOUND.play();
      }
      this.ySpeed = -12;
      this.jumping = true;
    }

    // TODO figure out if independent y and x checks do crazy things when ordered differently.
    let newY = this.y + this.ySpeed;
    let collision = null;
    let hack = false;

    if (newY >= this.y) {
      collision = level.bottomCollision(this.y + HALF_TILE, newY + HALF_TILE, this.x);
      if (collision) {
        if (collision >= this.y) {
          this.y = collision - HALF_TILE;
          this.ySpeed = 0;
          this.jumping = false;
        } else {
          hack = true;
        }
      } else {
        this.jumping = true;
      }
    } else if (newY < this.y) {
      this.jumping = true;
      collision = level.topCollision(this.y - HALF_TILE, newY - HALF_TILE, this.x);
      if (collision) {
        this.y = collision + HALF_TILE;
        this.ySpeed = 0;
      }
    }

    if (!collision || hack) {
      this.y = newY;
      this.ySpeed += 0.75;
    }

    if (this.running) {
      this.sprite.animate(16);
    }
  }
}

enum KeyCode {
  W = 87,
  A = 65,
  D = 68,
  ENTER = 13
}

class KeyState {
  state: { [keyCode: number]: boolean };

  constructor() {
    this.state = {};
  }

  public isDown = (key: KeyCode): boolean => {
    return this.state[key];
  };

  public onKeydown = (event: KeyboardEvent): void => {
    this.state[event.keyCode] = true;
  };

  public onKeyup = (event: KeyboardEvent): void => {
    this.state[event.keyCode] = false;
  };
}

// Global setup
let keyState = new KeyState();
window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keyup", keyState.onKeyup, false);

let player = new Player();
let enemies: Enemy[] = [];
let level = new Level(enemies);
setup();

// Game functions

function mainLoop(timestamp: number): void {
  clearScreen();

  if (player.won) {
    if (keyState.isDown(KeyCode.ENTER)) {
      setup();
    } else {
      context.save();
      context.font = "40px Times New Roman";
      canvas.textAlign = "center";
      context.fillStyle = "#FFFFFF";
      context.fillText("You Won! Press enter to play again.", 75, HEIGHT / 2);
      context.restore();
    }
  } else {
    update(timestamp);

    level.draw(context, player);
    enemies.forEach(enemy => enemy.draw(context, timestamp, player));
    player.draw();
    paintHealth();

    if (player.health <= 0) {
      setup();
    }
  }

  requestAnimationFrame(mainLoop);
}

function update(timestamp: number): void {
  player.update(keyState, level);
  enemies.forEach(enemy => enemy.update(player));
  enemies = enemies.filter(enemy => {
    if (enemy.dead) {
      enemy.sound.currentTime = 2.35102;
      return false;
    } else {
      return true;
    }
  });
}

function setup() {
  player = new Player();
  enemies.forEach(enemy => (enemy.sound.currentTime = 2.35102));
  enemies = [];
  level = new Level(enemies);
}

function paintHealth() {
  context.save();
  context.fillStyle = "#00A2E8";
  context.fillRect(WIDTH / 2 - 155, 65, 310, 20);
  context.fillStyle = "#004766";
  context.fillRect(WIDTH / 2 - 150, 70, 300, 10);
  context.fillStyle = "#99D9EA";
  context.fillRect(WIDTH / 2 - 150, 70, Math.max(player.health, 0) * 3, 10);
  context.restore();
}

function clearScreen() {
  context.save();
  context.fillStyle = "#448888";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.restore();
}

// Run game
requestAnimationFrame(mainLoop);
