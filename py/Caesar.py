# Шифр Цезаря

# Исходный текст
print('Введите исходный текст')
message = input()

# Ключ шифрования
print('Введите ключ')
key = int(input())

# Шифрация или дешифрация
print('Щифрование = 1, Дешифрование = 2')

a = int(input())
if a == 1:
    mode = 'encrypt'
elif a == 2:
    mode = 'decrypt'
else: print('Некорректный ввод')


# Возможные символы шифрования
LETTERS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

# Сохраняет результат операции
translated = ''


# Шифрация/дешифрация симолов строки по одному
for symbol in message:
    if symbol in LETTERS:
        # получаем номер символа
        num = LETTERS.find(symbol)
        if mode == 'encrypt':
            num = num + key
        elif mode == 'decrypt':
            num = num - key

        # переход в начало при выходе за длину алфавита
        if num >= len(LETTERS):
            num = num - len(LETTERS)
        elif num < 0:
            num = num + len(LETTERS)

        # запись полученного символа в результат
        translated = translated + LETTERS[num]

    else:
        translated = translated + symbol

print('Результат:',translated)