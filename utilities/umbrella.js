// lib/umbrella.ts

export const UMBRELLA_DIMENSIONS = {
  DIFFERENCE_POWER_EXCLUSION: 'Difference, Power & Exclusion',
  MOVEMENT_STATUS_BORDERS: 'Movement, Status & Borders',
  VOICE_ACTION_RESISTANCE: 'Voice, Action & Resistance',
  FAMILY_UPBRINGING_EVERYDAY: 'Family, Upbringing & Everyday Life',
  SENSE_OF_SELF_BELONGING: 'Sense of Self & Belonging',
};
export const ALL_UMBRELLAS = Object.values(UMBRELLA_DIMENSIONS);

export const TOPIC_TO_UMBRELLA = {
  // Voice, Action &amp; Resistance
  'Activism &amp; Resistance': UMBRELLA_DIMENSIONS.VOICE_ACTION_RESISTANCE,

  // Movement, Status &amp; Borders
  Citizenship: UMBRELLA_DIMENSIONS.MOVEMENT_STATUS_BORDERS,
  Migrations: UMBRELLA_DIMENSIONS.MOVEMENT_STATUS_BORDERS,

  // Difference, Power &amp; Exclusion
  'Discrimination &amp; Inequity':
    UMBRELLA_DIMENSIONS.DIFFERENCE_POWER_EXCLUSION,
  'Race &amp; Ethnicity': UMBRELLA_DIMENSIONS.DIFFERENCE_POWER_EXCLUSION,
  'Gender &amp; Sexuality': UMBRELLA_DIMENSIONS.DIFFERENCE_POWER_EXCLUSION,

  // Family, Upbringing &amp; Everyday Life
  'Families &amp; Relationships':
    UMBRELLA_DIMENSIONS.FAMILY_UPBRINGING_EVERYDAY,
  'Growing Up': UMBRELLA_DIMENSIONS.FAMILY_UPBRINGING_EVERYDAY,
  Language: UMBRELLA_DIMENSIONS.FAMILY_UPBRINGING_EVERYDAY,

  // Sense of Self &amp; Belonging
  'Identity &amp; Belonging': UMBRELLA_DIMENSIONS.SENSE_OF_SELF_BELONGING,
  Culture: UMBRELLA_DIMENSIONS.SENSE_OF_SELF_BELONGING,
  'Religion &amp; Belief': UMBRELLA_DIMENSIONS.SENSE_OF_SELF_BELONGING,

  // Lens / non-driving topic
  'Wings &amp; Roots': null,
};

export const UMBRELLA_PRIORITY = [
  UMBRELLA_DIMENSIONS.DIFFERENCE_POWER_EXCLUSION,
  UMBRELLA_DIMENSIONS.MOVEMENT_STATUS_BORDERS,
  UMBRELLA_DIMENSIONS.VOICE_ACTION_RESISTANCE,
  UMBRELLA_DIMENSIONS.FAMILY_UPBRINGING_EVERYDAY,
  UMBRELLA_DIMENSIONS.SENSE_OF_SELF_BELONGING,
];

export function resolvePrimaryUmbrella(topics, theme) {
  // STEP 0: explicit theme always wins
  if (theme && UMBRELLA_DIMENSIONS[theme]) {
    return UMBRELLA_DIMENSIONS[theme];
  }

  const candidateUmbrellas = new Set();

  // STEP 1: map topics → umbrellas
  for (const topic of topics || []) {
    const umbrella = TOPIC_TO_UMBRELLA[topic.name];
    if (umbrella) {
      candidateUmbrellas.add(umbrella);
    }
  }

  // STEP 2: resolve by priority
  for (const umbrella of UMBRELLA_PRIORITY) {
    if (candidateUmbrellas.has(umbrella)) {
      return umbrella;
    }
  }

  // STEP 3: final fallback
  return UMBRELLA_DIMENSIONS.SENSE_OF_SELF_BELONGING;
}
