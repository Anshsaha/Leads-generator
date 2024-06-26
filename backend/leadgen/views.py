from rest_framework.views import APIView
from . import services
from utils.utils import custom_response
from utils.custom_permissions import CustomAuth


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
    permission_classes = [CustomAuth]

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


class AddUserView(APIView):
    def post(self, request):
        try:
            name, email, role = (
                request.data.get(key) for key in ("name", "email", "user_role")
            )
            data = services.add_user_service(name, email, role)
            return custom_response(
                success=True,
                message="Successfully added user",
                data=data,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class EditUserView(APIView):
    def put(self, request, id):
        try:
            services.edit_user_service(id, request.data)
            return custom_response(
                success=True,
                message="Successfully edited user",
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class DeleteUserView(APIView):
    def delete(self, request, id):
        try:
            services.delete_user_service(id)
            return custom_response(
                success=True,
                message="Successfully deleted user",
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class SearchOrgsView(APIView):
    permission_classes = [CustomAuth]

    def post(self, request):
        try:
            services.search_orgs_service(
                request.data.get("data"), request.token_data.get("user_id")
            )
            return custom_response(
                success=True,
                message="Successfully fetched orgs",
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class GetUsageDataView(APIView):
    permission_classes = [CustomAuth]

    def get(self, request, keyword):
        try:
            usage = services.get_usage_data_service(
                keyword, request.token_data.get("user_id")
            )
            return custom_response(
                success=True,
                message="Successfully fetched usage",
                data=usage,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))


class GetResultView(APIView):
    permission_classes = [CustomAuth]

    def get(self, request, keyword, id):
        try:
            result = services.get_result_data_service(keyword, id)
            return custom_response(
                success=True,
                message="Successfully fetched result",
                data=result,
                status=200,
            )
        except Exception as err:
            return custom_response(message=str(err))
