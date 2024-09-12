from rest_framework import status
from rest_framework.exceptions import APIException


class BaseCustomException(APIException):
    detail = None
    status_code = None

    def __init__(self, detail, code):
        super().__init__(detail, code)
        self.detail = detail
        self.status_code = code


class NotFoundException(BaseCustomException):
    def __init__(self, error="Not Found Exception", desc=None):
        detail = UtilClass.create_exception_detail(error, desc)
        super().__init__(detail, status.HTTP_404_NOT_FOUND)


class OperationError(BaseCustomException):
    def __init__(self, error="Operation Error", desc=None):
        detail = UtilClass.create_exception_detail(error, desc)
        super().__init__(detail, status.HTTP_400_BAD_REQUEST)



class UtilClass():
    def create_exception_detail(error, desc):
        detail = {
            "error": error,
            "description": desc
        }
        return detail