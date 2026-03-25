#!/usr/bin/env python
# -*- coding: utf-8 -*-
lines = open(r'c:\Users\USER\Downloads\RTP TRY\styles.css', encoding='utf-8').readlines()
open(r'c:\Users\USER\Downloads\RTP TRY\styles.css', 'w', encoding='utf-8').writelines(lines[:4887])
print('Done, lines now:', len(open(r'c:\Users\USER\Downloads\RTP TRY\styles.css', encoding='utf-8').readlines()))
