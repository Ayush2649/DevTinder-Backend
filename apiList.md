# DevTinder API List

## authRouter
POST /signup
POST /login
POST /logout

## profileRouter
GET /profile/view
PATCH /profile/data
PATCH /profile/password

## requestRouter
POST /request/send/ignore/:userId
POST /request/send/interested/:userId
POST /request/recieve/accept/:userId
POST /request/recieve/reject/:userId

## userRouter
GET /user/feed
GET /user/requests
GET /user/connections

status: Ignore, Interested, Accept, Reject