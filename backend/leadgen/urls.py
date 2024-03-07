from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.UserLoginView.as_view()),
    path("get-user/<str:id>/", views.GetUserView.as_view()),
    path("get-all-users/", views.GetAllUserView.as_view()),
]
