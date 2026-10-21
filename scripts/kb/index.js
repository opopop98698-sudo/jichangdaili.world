// Master Aggregator for all 80 Topic Technical Knowledge Engines
import { recommendKB } from './recommend.js';
import { troubleshootingKB } from './troubleshooting.js';
import { subscriptionKB } from './subscription.js';
import { clientsKB } from './clients.js';
import { installKB } from './install.js';
import { freeKB } from './free.js';
import { reviewsKB } from './reviews.js';
import { learnKB } from './learn.js';

export const sectionKBMap = {
  recommend: recommendKB,
  troubleshooting: troubleshootingKB,
  subscription: subscriptionKB,
  clients: clientsKB,
  install: installKB,
  free: freeKB,
  reviews: reviewsKB,
  learn: learnKB
};

export function getTopicKnowledge(sectionId, topicId) {
  if (sectionKBMap[sectionId] && sectionKBMap[sectionId][topicId]) {
    return sectionKBMap[sectionId][topicId];
  }
  for (const s of Object.keys(sectionKBMap)) {
    if (sectionKBMap[s][topicId]) {
      return sectionKBMap[s][topicId];
    }
  }
  return null;
}
