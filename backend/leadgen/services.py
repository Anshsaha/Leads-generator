from leadgen_server import settings
from .serializers import UserSerializer
from .models import User
import jwt


def login_user_service(email, password):
    user = User.objects.get(email=email)
    if user.check_password(password):
        token = jwt.encode(
            {
                "user_id": str(user.id),
                "name": user.name,
                "email": user.email,
                "user_role": user.user_role,
            },
            settings.SECRET_KEY,
            algorithm="HS256",
        )
        return token
    else:
        raise Exception("Email or password incorrect!")


def get_user_service(user_id):
    user = User.objects.get(id=user_id)
    return UserSerializer(user).data


def get_all_users_service():
    users = User.objects.all()
    return UserSerializer(users, many=True).data
