from rest_framework.views import APIView
from . import services
from utils.utils import custom_response


class UserLoginView(APIView):
    def post(self, request):
        try:
            email, password = (request.data.get(key) for key in ("email", "password"))
            token = services.login_user_service(email, password)
            return custom_response(
                success=True,
                message="Successfully logged In",
                data=token,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class GetUserView(APIView):
    def get(self, request, id):
        try:
            user = services.get_user_service(id)
            return custom_response(
                success=True,
                message="Successfully retrieved user details",
                data=user,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class GetAllUserView(APIView):
    def get(self, request):
        try:
            users = services.get_all_users_service()
            return custom_response(
                success=True,
                message="Successfully retrieved all users",
                data=users,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))
