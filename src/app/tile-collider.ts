import { Matrix } from './math/matrix';
import { Entity, Side } from './entities/entity';
import { Match, TileResolver } from './tile-resolver';

export class TileCollider {

  tiles: TileResolver;

  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity: Entity) {
    let x: number;
    if (entity.velocity.x > 0) {
      x = entity.bounds.right;
    } else if (entity.velocity.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x, x,
      entity.bounds.top, entity.bounds.bottom);

    matches.forEach((match: Match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.velocity.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.obstruct(Side.Right, match);
        }
      } else if (entity.velocity.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.obstruct(Side.Left, match);
        }
      }
    });
  }

  checkY(entity: Entity) {
    let y: number;
    if (entity.velocity.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.velocity.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left, entity.bounds.right,
      y, y);

    matches.forEach((match: Match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.velocity.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.obstruct(Side.Bottom, match);
        }
      } else if (entity.velocity.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.obstruct(Side.Top, match);
        }
      }
    });
  }

}
