/**
 * @fileoverview Router configuration for the ACME Learning Center application
 * Defines all routes and navigation behavior for the application
 */

import {createRouter, createWebHistory} from "vue-router";

/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve initial load performance
 */

// const HomeComponent = () => import('../public/pages/home.component.vue');
const SignInComponent = () => import("../public/pages/signin.component.vue");
const SignUpComponent = () => import("../public/pages/signup.component.vue");
const ReportComponent = () => import("../troubleshooting/pages/report-issue.component.vue");
const ProfileComponent = () => import("../users/pages/profile.component.vue");
const MyIssuesComponent = () => import("../statistics/pages/my-issues-employee.component.vue");
const HistoryComponent = () => import("../statistics/pages/history-it-page.component.vue");
const DashboardComponent = () => import("../troubleshooting/pages/dashboard-page.component.vue");
const RecurrentPagesComponent = () => import("../statistics/pages/recurrent-issues-pages.vue");
const ManageCompanyComponent = () => import("../company/pages/manage-company.component.vue");

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * @description Application route definitions.
 * Each route object contains:
 * - path: URL path for the route
 * - name: Unique identifier for the route
 * - component: Vue component to render
 * - meta: Additional metadata including page title
 */
const routes = [
    {   path: '/signIn', name: 'signIn',component: SignInComponent, meta: {title: 'SignIn'}},
    {   path: '/signUp', name: 'signUp',component: SignUpComponent, meta: {title: 'SignUp'}},
    {   path: '/report', name: 'Report Issue',component: ReportComponent, meta: {title: 'Report Issue'}},
    {   path: '/profile', name: 'Profile',component: ProfileComponent, meta: {title: 'Profile'}},
    {   path: '/issues/reported', name: 'My Reported Issues',component: MyIssuesComponent, meta: {title: 'My Reported Issues'}},
    {   path: '/history', name: 'Issue History',component: HistoryComponent, meta: {title: 'History of Issues'}},
    {   path: '/dashboard', name: 'Dashboard',component: DashboardComponent, meta: {title: 'Dashboard'}},
    {   path: '/manageCompany', name: 'Manage Company',component: ManageCompanyComponent, meta: {title: 'Manage Company'}},
  {   path: '/recurrent', name: 'recurrent', component: RecurrentPagesComponent, meta: {title: 'Recurrent Issues'}},
//    {   path: '/:pathMatch(.*)*',       name: 'not-found',  component: PageNotFoundComponent,       meta: {title: 'Page not found'}},
]

/**
 * @type {import('vue-router').Router}
 * @description Vue Router instance configured with HTML5 history mode
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});

/**
 * @description Global navigation guard that runs before each route change
 * Handles:
 * - Navigation logging
 * - Dynamic page title updates based on route metadata
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route
 * @param {import('vue-router').RouteLocationNormalized} from - Current route
 * @param {import('vue-router').NavigationGuardNext} next - Function to resolve the navigation
 */

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'TickIT';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;