﻿import Vue from 'vue'
import Router from 'vue-router'
import entryFlow from '@/pages/entryFlow/entryFlow.vue'
import entryFlowOffer from '@/pages/entryFlow/entryFlow_offer.vue'
import InformMation from '@/pages/entryFlow/childComponents/InformMation.vue'
import socialInsuranceMessage from '@/pages/entryFlow/childComponents/socialInsuranceMessage.vue'
import educationMessage from '@/pages/entryFlow/childComponents/educationMessage.vue'
import salaryMessage from '@/pages/entryFlow/childComponents/salaryMessage.vue'
import workExperience from '@/pages/entryFlow/childComponents/workExperience.vue'
import entryOfferPDFCont from '@/pages/entryFlow/newPdf.vue'
import familyMessage from '@/pages/entryFlow/childComponents/familyMessage.vue'
import friendMessage from '@/pages/entryFlow/childComponents/friendMessage.vue'
import over from '@/pages/entryFlow/over.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/entryFlow',
      meta: {
        vShow: true,
        title: '入职办理'
      },
      children: []
    },
    {
      path: '/entryFlow',
      name: 'entryFlow',
      component: entryFlow,
      meta: {
        vShow: true,
        title: '入职办理'
      },
      children: []
    },
    {
      path: '/entryOfferPDFCont',
      name: 'entryOfferPDFCont',
      component: entryOfferPDFCont,
      meta: {
        vShow: true
      }
    },
    {
      path: '/over',
      name: 'over',
      component: over,
      meta: {
        isShow: true
      }
    },
    {
      path: '/entryFlowOffer',
      name: 'entryFlowOffer',
      component: entryFlowOffer,
      meta: {
        vShow: true,
        title: '入职办理'
      },
      children: [{
          path: '/entryFlowOffer/InformMation',
          name: 'InformMation',
          component: InformMation,
          meta: {
            vShow: true,
            title: '个人信息'
          }
        },
        {
          path: '/entryFlowOffer/familyMessage',
          name: 'familyMessage',
          component: familyMessage,
          meta: {
            vShow: true,
            title: '家庭信息'
          }
        },
        // {
        //   path: '/entryFlowOffer/socialInsuranceMessage',
        //   name: 'socialInsuranceMessage',
        //   component: socialInsuranceMessage,
        //   meta: {
        //     vShow: true,
        //     title: '社保信息'
        //   }
        // },
        {
          path: '/entryFlowOffer/educationMessage',
          name: 'educationMessage',
          component: educationMessage,
          meta: {
            vShow: true,
            title: '学历信息'
          }
        },
        {
          path: '/entryFlowOffer/salaryMessage',
          name: 'salaryMessage',
          component: salaryMessage,
          meta: {
            vShow: true,
            title: '工资信息'
          }
        },
        {
          path: '/entryFlowOffer/workExperience',
          name: 'workExperience',
          component: workExperience,
          meta: {
            vShow: true,
            title: '工作经历'
          }
        },
        {
          path: '/entryFlowOffer/friendMessage',
          name: 'friendMessage',
          component: friendMessage,
          meta: {
            vShow: true,
            title: '有无亲友在公司'
          }
        },
      ]
    }
  ]
})
