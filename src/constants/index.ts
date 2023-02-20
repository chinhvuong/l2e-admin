export const ACCESS_TOKEN_KEY = 'accessToken'
export const REFRESH_TOKEN_KEY = 'refreshToken'

export enum ApproveRequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export enum USER_SORT {
    CREATED_AT_ASC = 'cratedAt:1',
    COURSE_ENROLLED_ASC = 'courseEnrolled:1',
    COURSE_CREATED_ASC = 'courseCreated:1',
    CREATED_AT_DESC = 'cratedAt:-1',
    COURSE_ENROLLED_DESC = 'courseEnrolled:-1',
    COURSE_CREATED_DESC = 'courseCreated:-1',
}
export enum COURSE_SORT {
    PRICE_ASC = 'price:1',
    RATING_ASC = 'ratingCount:1',
    STUDENT_ASC = 'students:1',
    PRICE_DESC = 'price:-1',
    RATING_DESC = 'ratingCount:-1',
    STUDENT_DESC = 'students:-1'
}