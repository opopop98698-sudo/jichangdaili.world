import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './style.css';

// Import our custom components
import ClientIdentityCard from './components/ClientIdentityCard.vue';
import VerifiedDownloadLink from './components/VerifiedDownloadLink.vue';
import VersionScope from './components/VersionScope.vue';
import CompatibilityTable from './components/CompatibilityTable.vue';
import SetupSteps from './components/SetupSteps.vue';
import ErrorDecisionTree from './components/ErrorDecisionTree.vue';
import AnswerFirst from './components/AnswerFirst.vue';
import SourceList from './components/SourceList.vue';
import FAQSection from './components/FAQSection.vue';
import RelatedTasks from './components/RelatedTasks.vue';
import ServicePlanCard from './components/ServicePlanCard.vue';
import Disclosure from './components/Disclosure.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';
import PublishedContentIndex from './components/PublishedContentIndex.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ClientIdentityCard', ClientIdentityCard);
    app.component('VerifiedDownloadLink', VerifiedDownloadLink);
    app.component('VersionScope', VersionScope);
    app.component('CompatibilityTable', CompatibilityTable);
    app.component('SetupSteps', SetupSteps);
    app.component('ErrorDecisionTree', ErrorDecisionTree);
    app.component('AnswerFirst', AnswerFirst);
    app.component('SourceList', SourceList);
    app.component('FAQSection', FAQSection);
    app.component('RelatedTasks', RelatedTasks);
    app.component('ServicePlanCard', ServicePlanCard);
    app.component('Disclosure', Disclosure);
    app.component('Breadcrumbs', Breadcrumbs);
    app.component('PublishedContentIndex', PublishedContentIndex);
  }
} satisfies Theme;
