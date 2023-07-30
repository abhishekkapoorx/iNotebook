import random 
import string

allChars = f"{string.ascii_letters}{string.digits}"
# allChars = f"{string.ascii_letters}{string.digits}{string.punctuation}"

passLength = int(input("\nEnter the length of password:"))
password = ""

for i in range(passLength):
    rndmChar = random.choice(allChars)
    password += rndmChar

print(f"\nYour password: {password}")