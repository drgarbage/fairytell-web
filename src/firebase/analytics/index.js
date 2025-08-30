import firebase_app from "../config";
import { getAnalytics, isSupported, logEvent as firebaseLogEvent } from "firebase/analytics";

export default function initAnalytics(){
  return isSupported() ? getAnalytics(firebase_app) : null;
}

export const EVENTS = {
  VIEW_ITEM_LIST: 'view_item_list',
  SELECT_ITEM: 'select_item',
  VIEW_ITEM: 'view_item',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  ADD_TO_CART: 'add_to_cart',
  VIEW_CART: 'view_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  ADD_SHIPPING_INFO: 'add_shipping_info',
  ADD_PAYMENT_INFO: 'add_payment_info',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  SCREEN_VIEW: 'screen_view',
}

export const SCHEMA = {
  ITEM: {
    item_id: '',
    item_name: '',
    item_category: '',
    item_variant: '',
    item_brand: '',
    price: 0
  },
  LIST: {
    // transaction_id: '',
    // affiliation: '',

    currency: 'TWD',
    value: 0,
    // tax: 0,
    // shipping: 0,
    
    // coupon: '',
    // shipping_tier: '',
    // payment_type: '',
    items: []
  },
  SCREEN_VIEW: {
    firebase_screen: '', 
    firebase_screen_class: ''
  },
}

export function logEvent(event, params){
  const analytics = getAnalytics();
  if(analytics) 
    firebaseLogEvent(analytics, event, params);
}