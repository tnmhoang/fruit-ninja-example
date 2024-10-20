import { BorderValueRankForDifficulty, DifficultOrderBorder } from '@/types/order';
import gameConfig from '../lib/config.json';
export function getDifficultyBorderHelper(userVolunteerRank: number): DifficultOrderBorder {
  let difficultOrderBorder: DifficultOrderBorder = {
    min: 0,
    max: 0,
    object: {
      tier: 0,
      id: {
        min: 0,
        max: 0,
      },
      coins: 0,
      items: 0,
    },
  };
  const borderValuesRankForDifficulty = borderValuesRank();
  let left = 0,
    right = borderValuesRankForDifficulty.length - 1;
  // Check if rank > max of last tier
  if (userVolunteerRank >= borderValuesRankForDifficulty[right].rank) {
    difficultOrderBorder = copyDataToResult(
      difficultOrderBorder,
      borderValuesRankForDifficulty[right],
    );

    return difficultOrderBorder;
  }
  // Binary search for case border array length > 3
  while (left < right - 1) {
    const midIndex = Math.floor((left + right) / 2);
    if (userVolunteerRank == borderValuesRankForDifficulty[midIndex].rank) {
      difficultOrderBorder = copyDataToResult(
        difficultOrderBorder,
        borderValuesRankForDifficulty[midIndex],
      );
      return difficultOrderBorder;
    } else if (userVolunteerRank > borderValuesRankForDifficulty[midIndex].rank) {
      left = midIndex;
    } else {
      right = midIndex;
    }
  }

  difficultOrderBorder = copyDataToResult(
    difficultOrderBorder,
    borderValuesRankForDifficulty[left],
  );
  return difficultOrderBorder;
}

function copyDataToResult(
  difficultOrderBorder: DifficultOrderBorder,
  borderValueRankForDifficulty: BorderValueRankForDifficulty,
) {
  difficultOrderBorder.max = borderValueRankForDifficulty.maxDifficulty;
  difficultOrderBorder.min = difficultOrderBorder.max * 0.6;
  difficultOrderBorder.object = borderValueRankForDifficulty.object;
  return difficultOrderBorder;
}

function borderValuesRank() {
  const data = gameConfig['game']['border-values-rank-for-difficulty'];
  const resp = data.map(
    (item) =>
      ({
        maxDifficulty: item['max-difficulty'],
        object: item['object'],
        rank: item['rank'],
      }) as BorderValueRankForDifficulty,
  );
  return resp;
}
