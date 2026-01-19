// lib/curriculum.ts

export const CURRICULUM_DIMENSIONS = {
  MIGRATION: 'Migration',
  RACISM: 'Racism',
  IDENTITY_AND_BELONGING: 'Identity & Belonging',
};
export const CURRICULUM_DESCRIPTIONS = {
  [CURRICULUM_DIMENSIONS.MIGRATION]:
    'Stories exploring migration histories, citizenship, displacement, and cross-border movement.',

  [CURRICULUM_DIMENSIONS.RACISM]:
    'Reflections on racism, power, discrimination, and resistance in everyday life.',

  [CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING]:
    'Experiences of growing up, family life, language, culture, and belonging.',
};
export const ALL_CURRICULUM = Object.values(CURRICULUM_DIMENSIONS);

export const TOPIC_TO_CURRICULUM = {
  'Activism &amp; Resistance': CURRICULUM_DIMENSIONS.RACISM,
  Citizenship: CURRICULUM_DIMENSIONS.MIGRATION,
  Migrations: CURRICULUM_DIMENSIONS.MIGRATION,

  'Discrimination &amp; Inequity': CURRICULUM_DIMENSIONS.RACISM,
  'Race &amp; Ethnicity': CURRICULUM_DIMENSIONS.RACISM,
  'Gender &amp; Sexuality': CURRICULUM_DIMENSIONS.RACISM,

  'Families &amp; Relationships': CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  'Growing Up': CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  Language: CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  'Identity &amp; Belonging': CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  Culture: CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  'Religion &amp; Belief': CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
  'Wings &amp; Roots': CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
};

export const CURRICULAM_PRIORITY = [
  CURRICULUM_DIMENSIONS.RACISM,
  CURRICULUM_DIMENSIONS.MIGRATION,
  CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING,
];

export function resolvePrimaryCurriculum(topics) {
  const candidateCurricula = new Set();

  for (const topic of topics || []) {
    const curriculum = TOPIC_TO_CURRICULUM[topic.name];
    if (curriculum) {
      candidateCurricula.add(curriculum);
    }
  }
  for (const curriculum of CURRICULAM_PRIORITY) {
    if (candidateCurricula.has(curriculum)) {
      return curriculum;
    }
  }
  return CURRICULUM_DIMENSIONS.IDENTITY_AND_BELONGING;
}
