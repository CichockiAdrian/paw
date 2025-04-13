__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Adrian Cichocki 4c"

import datetime
import json
from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade

teachers = []
subjects = []
students = []
grades = []

with open('teachers.txt', 'r') as f:
    for line in f:
        teacher_id, name, surname = line.split()
        teachers.append(Teacher(int(teacher_id), name, surname))

with open('subjects.txt', 'r') as f:
    for line in f:
        subject_id, subject_name, teacher_id = line.split()
        teacher = next((t for t in teachers if t._id == int(teacher_id)), None)
        if teacher:
            subjects.append(Subject(int(subject_id), subject_name, teacher))

with open('students.txt', 'r') as f:
    for line in f:
        student_id, first_name, last_name, birth_date_str = line.split()
        birth_date = datetime.datetime.strptime(birth_date_str, '%Y-%m-%d').date()
        students.append(Student(int(student_id), first_name, last_name, birth_date))

with open('grades.txt', 'r') as f:
    for line in f:
        student_id, subject_id, grades_str = line.split()
        student = next((s for s in students if s._id == int(student_id)), None)
        subject = next((subj for subj in subjects if subj._id == int(subject_id)), None)
        if student and subject:
            grade_list = list(map(int, grades_str.split(',')))
            grades.append(Grades(grade_list, student, subject))

for student in students:
    print(f'{student.first_name} {student.last_name} ({student.age}):')
    for subject in subjects:
        subject_grades = [grade for grade in grades if grade.student == student and grade.subject == subject]
        if subject_grades:
            grades_list = subject_grades[0].get_grades()
            avg = subject_grades[0].get_average()
            year_grade_value = year_grade(avg)
            print(f'{subject.name}:')
            print(f'Oceny: {", ".join(map(str, grades_list))}')
            print(f'Średnia: {avg:.2f}')
            print(f'Ocena końcowa: {year_grade_value}')
    print()

students_json = []
for student in students:
    student_data = {f'{student.first_name} {student.last_name} ({student.age})': {}}
    for subject in subjects:
        subject_grades = [grade for grade in grades if grade.student == student and grade.subject == subject]
        if subject_grades:
            grades_list = subject_grades[0].get_grades()
            avg = subject_grades[0].get_average()
            year_grade_value = year_grade(avg)
            student_data[f'{subject.name}'] = {
                'Oceny': ', '.join(map(str, grades_list)),
                'Srednia': avg,
                'Ocena roczna': year_grade_value
            }
    students_json.append(student_data)

with open('students.json', 'w') as f:
    json.dump(students_json, f, indent=4)

subjects_json = []
for subject in subjects:
    subject_grades = [grade for grade in grades if grade.subject == subject]
    if subject_grades:
        grades_list = [grade for grade in subject_grades for grade in grade.get_grades()]
        avg = sum(grades_list) / len(grades_list)
        subject_data = {
            subject.name: {
                'Nauczyciel': f'{subject.teacher.name} {subject.teacher.surname}',
                'Oceny': grades_list,
                'Srednia': avg
            }
        }
        subjects_json.append(subject_data)

with open('subjects.json', 'w') as f:
    json.dump(subjects_json, f, indent=4)


print('=' * 50)
