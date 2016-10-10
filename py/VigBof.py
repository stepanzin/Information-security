# Шифр Виженера
print('Щифрование = 1, Дешифрование = 2')
a = int(input())
# Исходный текст
print('Введите исходный текст')
if a == 1:
    m = input()
    print('Введите ключ')
    k = input()
if a == 2:
    c = input()
    print('Введите ключ')
    k = input()

if a == 1:
    k *= len(m) // len(k) + 1  # подгоняем ключ
    c = ''.join([chr((ord(j) + ord(k[i])) % 26 + ord('A')) for i, j in enumerate(m)])
    # шифруем через получение номера символа ASCII внутренней функцией
    print(c)
elif a == 2:
    k *= len(c) // len(k) + 1  # подгоняем ключ
    m = ''.join([chr((ord(j) - ord(k[i])) % 26 + ord('A')) for i, j in enumerate(c)])  # расшифровываем
    print(m)