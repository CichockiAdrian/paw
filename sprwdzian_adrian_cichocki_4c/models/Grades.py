__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Adrian Cichocki 4c"

from .Student import Student
from .Subject import Subject


class Grades:
    def __init__(self, grades=None, student=None, subject=None):
        if grades is None:
            grades = []
        self.grades = grades
        self.student = student
        self.subject = subject

    def add_grade(self, grade):
        if grade < 1 or grade > 6:
            raise ValueError("Ocena musi byc liczba z zakresu od 1 do 6")
        self.grades.append(grade)

    def get_grades(self):
        return self.grades

    def get_average(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0


