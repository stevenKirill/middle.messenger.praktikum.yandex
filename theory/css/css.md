*                                  /* универсальный селектор */
div, span, a                       /* селекторы по имени тегов */
.class                             /* селекторы по имени классов */
#id                                /* селекторы по идентификаторам */
[type="text"], [src*="/img/"]      /* селекторы по атрибутам */
:first-child, :visited, :nth-of-type(An+B), :empty ... 
::before, ::placeholder, ::selection, ::first-letter ... 
a > a, a + a , a ~ a               /* вложенность и каскадирование */