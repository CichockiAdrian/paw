
class Student:
    def __init__(self, student_id,firstName,lastName,age):
        self.student_id = student_id
        self.firstName = firstName
        self.lastName = lastName
        self.age = age
        self.courses = []
    def __str__(self):
        return f"{self.firstName} {self.lastName}({self.age}lat): {', '.join(self.courses)}"
class Course:
    def ___init___(self, student_id, nazwaKursu ):
        self.student_id = student_id
        self.nazwaKursu = nazwaKursu
    def __str__(self):
        return f"{self.nazwaKursu}"

def import_students(filePath):
    students = {}
    with open(filePath,'r') as file:
        for line in file:
            student_id,firstName,lastName,age = line.strip().split(',')
            students[student_id] = Student(student_id, firstName,lastName, int(age))
        return students

def import_courses(filePath,students):
    courses = {}
    with open(filePath,'r') as file:
        for line in file:
            student_id,nazwaKursu = line.strip().split(',')
            if student_id in students:
                students[student_id].courses.append(nazwaKursu)

students = import_students("students.txt")
courses = import_courses("courses.txt",students)

for student in students.values():
    print(student)

for student in students.values():
    file_name = f"{student.firstName}_{student.lastName}.txt"
    with open(file_name,'w') as file:
        file.write(f"Kursy:\n")
        for course in student.courses:
            file.write(f" - {course}\n")
