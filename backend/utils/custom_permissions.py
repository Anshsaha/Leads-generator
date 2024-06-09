import jwt
import leadgen_server.settings as settings
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class CustomAuth(BasePermission):
    def has_permission(self, request, view):
        # Get the Authorization header
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if auth_header and auth_header.startswith("Bearer "):
            # Extract the token from the header
            token = auth_header.split()[1]
            try:
                token_data = jwt.decode(
                    token, settings.SECRET_KEY, algorithms=["HS256"]
                )
                request.token_data = token_data

                return True
            except Exception as e:
                raise PermissionDenied("Invalid token")
        else:
            raise PermissionDenied("Missing or invalid Authorization header")
