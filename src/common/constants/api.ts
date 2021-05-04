const API = {
    LOGIN: 'auth/customer-login',
    SIGN_UP: 'auth/customer-signup',
    GET_ALL_COUNTRIES: 'country/find-all',
    GET_ALL_POST_CODES: 'postcode/find-all',
    VERIFY_CODE_TO_SIGN_UP: 'auth/verify-signUp-code',
    VERIFY_CODE_TO_RESET_PASSWORD: 'auth/verify-resetPassword-code',
    SEND_VERIFY_CODE: 'auth/send-verify-code',
    CUSTOMER_RESET_PASSWORD: 'auth/customer-reset-password',
    GET_USER_INFO: 'customer/detail',
    GET_PRODUCT_BY_ID: '/product/find-by-id/',
    GET_BRANCH_BY_PRODUCT_ID: '/branch/list-branch-by-product-id',
    GET_BY_BRANCH_ID: '/product/find-by-branch-id',
    GET_ALL_CATEGORIES: 'category/find-all',
    GET_PRODUCTS_BY_KEY: 'product/find-by-key',
    GET_ALL_PRODUCT_BY_CATEGORY: 'product/find-all-by-category',
    WRITE_LOG_VIEW_PRODUCT: 'log-view/write-log',
    GET_PRODUCTS_BY_LOG_VIEW: 'log-view/get-top-view-product',
    ALLERGEN: {
        GET_LIST: 'allergen/find-all',
        GET_LIST_BY_CUSTOMER: 'allergen/find-by-customer',
        CREATE_BY_CUSTOMER: 'allergen/create-by-customer',
        DELETE_BY_CUSTOMER: 'allergen/delete-by-customer',
    },
    INGREDIENT: {
        GET_BY_NAME: 'ingredient/find-by-name',
        GET_LIST_BY_CUSTOMER: 'ingredient/find-by-customer',
        GET_LIST_BY_ALLERGEN: 'ingredient/customer-find-all-by-allergen',
        CREATE_BY_CUSTOMER: 'ingredient/create-by-customer',
        DELETE_BY_CUSTOMER: 'ingredient/delete-by-customer',
    },
    CHANGE_AVATAR: 'customer/change-avatar',
    DELETE_AVATAR: 'customer/delete-avatar',
    WISHLIST: {
        GET_LIST: '/wishlist/find-all',
        CREATE: '/wishlist/create',
        DELETE: '/wishlist/delete-wishlist',
        UPDATE: '/wishlist/update',
        GET_LIST_PRODUCTS: '/wishlist/find-all-wishlist-product-branch',
        CREATE_PRODUCT: '/wishlist/create-wishlist-product-branch',
        REMOVE_PRODUCT: '/wishlist/delete-wishlist-product-branch',
        UPDATE_PRODUCT: '/wishlist/update-wishlist-product-branch',
        GET_IMAGE: 'wishlist/get-image',
    },
    CUSTOMER: {
        UPDATE_PROFILE: '/customer/customer-update-profile',
        CHANGE_PASSWORD: '/customer/customer-change-password',
    },

    ADMIN: {
        LOGIN: 'auth/admin-login',
        COUNTRY: {
            GET_ALL: 'admin/country/find-all-pagination',
            DELETE: 'admin/country/delete-by-id',
            GET_BY_ID: 'admin/country/find-by-id',
            UPDATE_BY_ID: 'admin/country/update-by-id',
            CREATE: 'admin/country/create',
        },
        BRANCH: {
            GET_ALL: 'admin/branch/find-all-pagination',
            GET_TOTAL_NUMBER_BRANCH: 'admin/branch/count/kroger',
        },
        PRODUCT: {
            FIND_ALL_BY_BRANCH: 'admin/product/find-all-by-branch',
            FIND_ALL_BY_CATEGORY: 'admin/product/find-all-by-category',
            FIND_BY_ID: 'admin/product/find-by-id',
            GET_TOTAL_NUMBER_PRODUCT: 'admin/product/count/kroger',
            GET_PRODUCT_VIEWS: 'admin/log-view/get-all',
        },
        GET_LIST_CATEGORY: 'admin/category/get-list',
        CREATE_CATEGORY: 'admin/category/create',
        UPDATE_CATEGORY: 'admin/category/update',
        DELETE_CATEGORY: 'admin/category/delete',
        LOG_VIEW: {
            GET_TOP_VIEWS_BY_UPC: '/admin/log-view/get-top-viewed-by-upc',
            GET_BY_UPC: '/admin/log-view/get-by-upc',
        },
        ALLERGEN: {
            CREATE: 'admin/allergen/create',
            DELETE: 'admin/allergen/delete',
            GET_LIST: 'admin/allergen/find-all',
            GET_LIST_BY_INGREDIENT: 'admin/allergen/find-all-by-ingredient',
        },
        INGREDIENT: {
            CREATE_OF_ALLERGEN: 'admin/ingredient/create-allergen-ingredient',
            DELETE_FROM_ALLERGEN: 'admin/ingredient/delete',
            GET_LIST_BY_NAME: 'admin/ingredient/find-by-name',
            GET_LIST_BY_ALLERGENS: 'admin/ingredient/find-all-by-allergen',
        },
        API_STATUS: {
            MONITOR: 'admin/api-status/get-api-status',
            NOTIFICATION: 'admin/api-status/get-all-notification',
            UPDATE_NOTIFICATION: 'admin/api-status/update-notification',
            GET_CURRENT_STATUS: 'admin/api-status/get-current-notification',
        },
    },
    GEOCODING: 'data/reverse-geocode-client',
};

export default API;
