import os

for file in os.listdir("."):
    if file.startswith("T"):
        name,ext = os.path.splitext(file)
        new_name = "10" + name[1:] + ext
        os.rename(file, new_name)

for file in os.listdir("."):
    if file.startswith("K"):
        name,ext = os.path.splitext(file)
        new_name = "KING" + name[1:] + ext
        os.rename(file, new_name)

for file in os.listdir("."):
    if file.startswith("J"):
        name,ext = os.path.splitext(file)
        new_name = "JACK" + name[1:] + ext
        os.rename(file, new_name)

for file in os.listdir("."):
    if file.startswith("Q"):
        name,ext = os.path.splitext(file)
        new_name = "QUEEN" + name[1:] + ext
        os.rename(file, new_name)

for file in os.listdir("."):
    if file.startswith("A"):
        name,ext = os.path.splitext(file)
        new_name = "ACE" + name[1:] + ext
        os.rename(file, new_name)


