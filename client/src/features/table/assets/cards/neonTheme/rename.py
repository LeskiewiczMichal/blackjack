import os

for filename in os.listdir('.'):
    if filename.endswith('.svg'):
        os.rename(filename, filename.replace('.svg', '_neon.svg'))