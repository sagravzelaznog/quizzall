/**
 * @file bdquizizz.js
 * @description Base de datos centralizada y Motor de Evaluaciones Kahoot-Style
 * @author JMGV - Proyecto PTEL (Pensamiento Matemático II)
 */

/* ==========================================================================
   1. SISTEMA DE SEGURIDAD DOCENTE (UNIVERSAL)
   ========================================================================== */
   function unlockTeacherMode() {
    const pin = document.getElementById('master-pin') || document.getElementById('master-key') || document.getElementById('unlock-key') || document.getElementById('teacher-pass');
    if (pin && pin.value === "1983") {
        const notes = document.getElementById('hidden-notes') || document.getElementById('teacher-notes') || document.getElementById('teacher-zone') || document.getElementById('secret-area');
        if (notes) {
            notes.style.display = 'block';
            alert("Autenticación exitosa. Protocolos pedagógicos JMGV-PTEL activados.");
        }
    } else {
        alert("Acceso denegado. Clave incorrecta.");
    }
}

/* ==========================================================================
   2. BASE DE DATOS DE PREGUNTAS (TODAS LAS SESIONES)
   ========================================================================== */
const quizDatabase = {/* ==========================================================================
    BASE DE DATOS MAESTRA: QUIZIZZ PM2 (SESIONES 1 a 19)
    Módulo I: Del Lenguaje Natural al Algebraico
    Módulo II: Números Reales y Financieros
    ========================================================================== */
 
   // Módulo I y II (Sesiones 1 - 19) -> Estructura lista para recibir datos

     // ---------------- MÓDULO I ----------------
     s1: [ // P1: Lenguaje Natural vs Matemático
         { q: "¿Cuál es la principal ventaja del lenguaje matemático sobre el natural?", o: ["Es más largo", "Es ambiguo", "Es preciso y universal", "Tiene letras"], c: 2 },
         { q: "¿Cómo se lee la expresión '2x'?", o: ["Dos más equis", "El doble de un número", "La mitad de un número", "Un número al cuadrado"], c: 1 },
         { q: "La frase 'Un número disminuido en cinco' se traduce como:", o: ["x + 5", "5 - x", "x - 5", "5x"], c: 2 },
         { q: "¿Qué representa una 'variable' (como x o y)?", o: ["Un valor constante", "Un error", "Un valor desconocido o cambiante", "Un símbolo de suma"], c: 2 },
         { q: "Traduce: 'La tercera parte de un número'", o: ["3x", "x - 3", "x/3", "x + 3"], c: 2 }
     ],
 
     s2: [ // P1: Rigurosidad Matemática
         { q: "En matemáticas, ¿qué significa el símbolo '≠'?", o: ["Aproximadamente", "Mayor que", "Diferente de", "Infinito"], c: 2 },
         { q: "Traduce: 'El cuadrado de un número más uno'", o: ["(x+1)²", "x² + 1", "2x + 1", "x + 1²"], c: 1 },
         { q: "¿Por qué es importante el uso de paréntesis en álgebra?", o: ["Para decorar", "Para alterar el orden jerárquico de las operaciones", "Para confundir", "Para multiplicar siempre"], c: 1 },
         { q: "La expresión '2(x + 3)' significa:", o: ["El doble de x, más 3", "El doble de la suma de un número y tres", "Dos por tres más x", "x más seis"], c: 1 },
         { q: "El símbolo '∴' significa:", o: ["Por lo tanto", "Porque", "Suma", "Infinito"], c: 0 }
     ],
 
     s3: [ // P2: Sintaxis Algebraica
         { q: "¿Cuáles son las partes de un término algebraico?", o: ["Signo, coeficiente, literal y exponente", "Suma y resta", "Letras y números", "Raíz y potencia"], c: 0 },
         { q: "En el término '-5x³', ¿cuál es el coeficiente?", o: ["x", "3", "-5", "5"], c: 2 },
         { q: "Al simplificar 3x + 2x - x, obtenemos:", o: ["5x", "4x", "6x", "3x"], c: 1 },
         { q: "¿Qué resulta de multiplicar (x)(x)?", o: ["2x", "x²", "x", "1"], c: 1 },
         { q: "El desarrollo de (a + b)² es:", o: ["a² + b²", "a² - b²", "a² + 2ab + b²", "2a + 2b"], c: 2 }
     ],
 
     s4: [ // P2: Factorización y Estructura
         { q: "¿Qué es factorizar?", o: ["Multiplicar", "Sumar términos", "Expresar una suma/resta como producto", "Dividir entre cero"], c: 2 },
         { q: "¿Cuál es el factor común en '4x + 8'?", o: ["x", "2", "8", "4"], c: 3 },
         { q: "Factoriza la diferencia de cuadrados: x² - 9", o: ["(x-3)(x-3)", "(x+3)(x-3)", "(x-9)(x+1)", "(x+9)(x-9)"], c: 1 },
         { q: "Al factorizar 3x² + 6x, el resultado es:", o: ["3x(x + 2)", "x(3x + 6)", "3(x² + 2x)", "Todas las anteriores son equivalentes"], c: 3 },
         { q: "La expresión (x+5)(x-5) es el resultado de factorizar:", o: ["x² - 10", "x² + 25", "x² - 25", "x² - 5"], c: 2 }
     ],
 
     s5: [ // P3: Modelado Algebraico I
         { q: "Modelar significa:", o: ["Hacer maquetas", "Traducir un problema real a una ecuación matemática", "Dibujar gráficas", "Adivinar la respuesta"], c: 1 },
         { q: "'El perímetro de un terreno rectangular es 100m, y el largo es el doble del ancho'. El modelo es:", o: ["2(2x) + 2(x) = 100", "x + 2x = 100", "x * 2x = 100", "2x = 100"], c: 0 },
         { q: "Si 'x' es el precio de un lápiz, y compro 3 lápices pagando con $50 y recibiendo $20 de cambio. El modelo es:", o: ["3x - 50 = 20", "50 - 3x = 20", "3x = 50 + 20", "x - 50 = 20"], c: 1 },
         { q: "¿Qué es lo primero al modelar un problema?", o: ["Resolver la ecuación", "Definir quién será la variable 'x'", "Hacer la comprobación", "Sumar los datos"], c: 1 },
         { q: "'La suma de dos números consecutivos es 15'. El modelo es:", o: ["x + y = 15", "x + (x+1) = 15", "2x = 15", "x + 2 = 15"], c: 1 }
     ],
 
     s6: [ // P3: Modelado Algebraico II
         { q: "Al resolver 50 - 3x = 20, el primer paso lógico es:", o: ["Restar 3x", "Mover el 50 al otro lado", "Dividir entre 3", "Sumar 20"], c: 1 },
         { q: "Si 2x = 10, entonces 'x' vale:", o: ["12", "8", "5", "20"], c: 2 },
         { q: "Resuelve: x + x + 1 = 15", o: ["x = 7", "x = 8", "x = 14", "x = 7.5"], c: 0 },
         { q: "Si la base de un rectángulo es 10 y su área es 50, ¿cuál ecuación lo resuelve si 'h' es altura?", o: ["10 + h = 50", "10 / h = 50", "10h = 50", "h - 10 = 50"], c: 2 },
         { q: "¿Qué significa el resultado de un modelo?", o: ["Solo un número", "La solución real al problema planteado", "Una constante", "Un error"], c: 1 }
     ],
 
     s7: [ // P3: Taller de Modelación
         { q: "En un taller de modelación, lo más importante es:", o: ["Copiar", "Trabajar rápido", "La interpretación correcta del contexto", "Usar calculadora"], c: 2 },
         { q: "'Tengo gallinas(x) y vacas(y). Hay 20 cabezas'. La ecuación es:", o: ["x * y = 20", "x + y = 20", "2x + 4y = 20", "x - y = 20"], c: 1 },
         { q: "Continuando el problema anterior: 'Hay 60 patas en total'. La ecuación es:", o: ["x + y = 60", "4x + 2y = 60", "2x + 4y = 60", "x * y = 60"], c: 2 },
         { q: "Si un tren va a 80km/h por 't' horas y recorre 400km, la ecuación es:", o: ["80 + t = 400", "t / 80 = 400", "80t = 400", "400t = 80"], c: 2 },
         { q: "Validar un modelo significa:", o: ["Sustituir el resultado para ver si tiene sentido en la vida real", "Entregarlo al maestro", "Pintarlo", "Hacerlo complicado"], c: 0 }
     ],
 
     s8: [ // P4: Enteros y Divisibilidad
         { q: "¿Qué es un número primo?", o: ["El que se divide entre muchos", "El que solo es divisible entre 1 y sí mismo", "Los números pares", "Los números negativos"], c: 1 },
         { q: "La Criba de Eratóstenes sirve para:", o: ["Sumar fracciones", "Encontrar números primos", "Dividir decimales", "Dibujar círculos"], c: 1 },
         { q: "¿Cuál de estos es un número primo?", o: ["9", "15", "17", "21"], c: 2 },
         { q: "Un número compuesto es aquel que:", o: ["Tiene más de dos divisores", "Es impar", "Es primo", "Es cero"], c: 0 },
         { q: "¿El número 1 es primo?", o: ["Sí", "No, es una excepción", "A veces", "Es compuesto"], c: 1 }
     ],
 
     s9: [ // P4: Propiedades de los Enteros
         { q: "El Teorema Fundamental de la Aritmética dice que:", o: ["Todo número se puede sumar", "Todo número compuesto se descompone en un producto único de primos", "Los primos son infinitos", "1+1=2"], c: 1 },
         { q: "La descomposición prima de 12 es:", o: ["3 x 4", "2 x 6", "2² x 3", "2 x 2 x 2"], c: 2 },
         { q: "¿Cuál es la descomposición prima de 20?", o: ["4 x 5", "2² x 5", "2 x 10", "2³ x 3"], c: 1 },
         { q: "Si termina en 0 o 5, el número siempre es divisible entre:", o: ["2", "3", "5", "10"], c: 2 },
         { q: "La suma de los dígitos de un número es múltiplo de 3, entonces el número es divisible entre:", o: ["2", "3", "5", "9"], c: 1 }
     ],
 
     s10: [ // P5: MCD y mcm Conceptuales
         { q: "¿Qué significa MCD?", o: ["Mínimo Común Divisor", "Máximo Común Divisor", "Múltiplo Común Dividido", "Máximo Común Doble"], c: 1 },
         { q: "¿Qué significa mcm?", o: ["Máximo Común Múltiplo", "Mínimo Común Múltiplo", "Múltiplo Cero Mínimo", "Medida Común Máxima"], c: 1 },
         { q: "El MCD se usa en problemas donde necesitas:", o: ["Encontrarse en el futuro", "Repartir, dividir o cortar en partes iguales más grandes posibles", "Sumar todo", "Multiplicar"], c: 1 },
         { q: "El mcm se usa en problemas donde necesitas:", o: ["Cortar madera", "Saber cuándo coincidirán dos eventos periódicos en el futuro", "Restar", "Hacer grupos pequeños"], c: 1 },
         { q: "El MCD de 8 y 12 es:", o: ["2", "4", "24", "8"], c: 1 }
     ],
 
     s11: [ // P5: Aplicación de MCD y mcm
         { q: "Luces rojas parpadean cada 4s y azules cada 6s. ¿Cuándo coinciden? Usamos:", o: ["MCD", "mcm", "Suma", "División"], c: 1 },
         { q: "Tengo cuerdas de 12m y 18m, quiero cortarlas en pedazos iguales lo más largos posibles. Usamos:", o: ["mcm", "MCD", "Resta", "Multiplicación"], c: 1 },
         { q: "El mcm de 4 y 6 es:", o: ["2", "10", "12", "24"], c: 2 },
         { q: "El MCD de 12 y 18 es:", o: ["2", "3", "6", "36"], c: 2 },
         { q: "Si un bus pasa cada 10 min y otro cada 15 min, coinciden cada:", o: ["30 min", "5 min", "150 min", "25 min"], c: 0 }
     ],
 
     // ---------------- MÓDULO II ----------------
 
     s12: [ // P6: Historia de los Números Reales
         { q: "Los números Naturales (N) surgieron por la necesidad de:", o: ["Medir deudas", "Contar objetos (ganado, semillas)", "Medir partes", "Calcular el vacío"], c: 1 },
         { q: "Los números Enteros (Z) incluyen a los naturales, el cero y...", o: ["Las fracciones", "Los irracionales", "Los números negativos (deudas)", "Los decimales"], c: 2 },
         { q: "Los números que se pueden expresar como fracción a/b se llaman:", o: ["Naturales", "Irracionales", "Racionales (Q)", "Complejos"], c: 2 },
         { q: "El número Pi (π) es un ejemplo famoso de número:", o: ["Racional", "Entero", "Irracional", "Natural"], c: 2 },
         { q: "La unión de los Racionales y los Irracionales forma el conjunto de:", o: ["Los Enteros", "Los Reales (R)", "Los Naturales", "Los Imaginarios"], c: 1 }
     ],
 
     s13: [ // P6: Estructura de Campo
         { q: "La propiedad que dice 'El orden de los factores no altera el producto' es la:", o: ["Asociativa", "Distributiva", "Conmutativa", "Clausura"], c: 2 },
         { q: "La propiedad 'a(b + c) = ab + ac' se conoce como:", o: ["Conmutativa", "Asociativa", "Elemento neutro", "Distributiva"], c: 3 },
         { q: "¿Cuál es el elemento neutro de la suma?", o: ["1", "0", "-1", "x"], c: 1 },
         { q: "¿Cuál es el elemento neutro de la multiplicación?", o: ["0", "1", "x", "-1"], c: 1 },
         { q: "La densidad de la recta numérica significa que:", o: ["La recta pesa mucho", "Entre dos números reales siempre hay otro número real", "Solo hay enteros", "Tiene fin"], c: 1 }
     ],
 
     s14: [ // P7: Proporcionalidad Directa/Inversa
         { q: "En la proporcionalidad DIRECTA, si una variable aumenta, la otra:", o: ["Disminuye", "Se queda igual", "También aumenta en la misma proporción", "Se vuelve cero"], c: 2 },
         { q: "En la proporcionalidad INVERSA, si una variable aumenta (ej. velocidad), la otra (ej. tiempo):", o: ["Aumenta", "Disminuye", "No cambia", "Es igual a la masa"], c: 1 },
         { q: "Si 2 kilos de manzana cuestan $40, ¿cuánto cuestan 5 kilos? (Proporción Directa)", o: ["$100", "$80", "$50", "$200"], c: 0 },
         { q: "Si 4 obreros construyen un muro en 10 días, 8 obreros lo harán en: (Proporción Inversa)", o: ["20 días", "5 días", "10 días", "2 días"], c: 1 },
         { q: "La regla de tres simple se basa en:", o: ["Sumas", "Logaritmos", "Proporcionalidad", "Geometría"], c: 2 }
     ],
 
     s15: [ // P7: Porcentajes en Contexto
         { q: "Un porcentaje es en realidad una fracción con denominador:", o: ["10", "100", "1000", "1"], c: 1 },
         { q: "Para calcular el 20% de $500, multiplicas 500 por:", o: ["20", "2.0", "0.20", "0.02"], c: 2 },
         { q: "Un zapato cuesta $1000 y tiene 30% de descuento. ¿Cuánto pagas?", o: ["$300", "$1300", "$700", "$970"], c: 2 },
         { q: "Si al precio de $200 se le agrega el 16% de IVA, el total es:", o: ["$216", "$232", "$168", "$316"], c: 1 },
         { q: "Decir 'la mitad del precio' equivale a un descuento del:", o: ["25%", "50%", "100%", "75%"], c: 1 }
     ],
 
     s16: [ // P7: Taller de Proporciones
         { q: "En un mapa, la escala es 1:100. Esto significa que 1 cm en el mapa equivale a:", o: ["1 m en la realidad", "10 m en la realidad", "100 m en la realidad", "1 km en la realidad"], c: 0 }, // 100cm = 1m
         { q: "Si mezclas 2 litros de pintura azul con 3 de amarilla, la proporción de azul es:", o: ["2/3", "3/5", "2/5", "1/2"], c: 2 },
         { q: "En una receta para 4 personas usas 200g de harina. Para 2 personas usarás:", o: ["400g", "100g", "50g", "300g"], c: 1 },
         { q: "Trabajar en equipo para resolver escalas fomenta:", o: ["Dificultades", "Pensamiento aislado", "La validación cruzada y el debate", "Copiar"], c: 2 },
         { q: "Las escalas arquitectónicas utilizan qué tipo de proporcionalidad?", o: ["Inversa", "Directa", "Exponencial", "Logarítmica"], c: 1 }
     ],
 
     s17: [ // P8: Matemática Financiera: Interés
         { q: "El Interés Simple se calcula:", o: ["Siempre sobre el capital inicial", "Sobre el capital más los intereses acumulados", "Al azar", "Restando la inflación"], c: 0 },
         { q: "El Interés Compuesto se caracteriza porque:", o: ["No genera ganancias", "Los intereses generan más intereses (capitalización)", "Solo lo usan los bancos suizos", "Disminuye la deuda"], c: 1 },
         { q: "La fórmula I = C * r * t corresponde a:", o: ["Interés Compuesto", "Descuento", "Interés Simple", "Inflación"], c: 2 },
         { q: "¿Cuál tipo de interés hace crecer tu inversión más rápido a largo plazo?", o: ["Simple", "Compuesto", "Fijo", "Cero"], c: 1 },
         { q: "En la fórmula financiera, la letra 'r' (o 'i') representa:", o: ["El retorno", "La tasa de interés (porcentaje)", "El tiempo", "El capital"], c: 1 }
     ],
 
     s18: [ // P8: Ahorro y Deuda
         { q: "¿Qué es una tabla de amortización?", o: ["Un mueble", "El registro del pago gradual de una deuda", "Una lista de intereses simples", "Un ticket de compra"], c: 1 },
         { q: "En las tarjetas de crédito, si solo pagas el 'pago mínimo', tu deuda:", o: ["Desaparece", "Se paga rápido", "Crece o tarda mucho en pagarse por los intereses", "Se congela"], c: 2 },
         { q: "Un 'abono a capital' sirve para:", o: ["Pagar más intereses", "Reducir el dinero base que debes, bajando futuros intereses", "Atrasar el pago", "Comprar más cosas"], c: 1 },
         { q: "Una deuda con interés compuesto en tu contra es:", o: ["Buena", "Peligrosa si no se controla, crece exponencialmente", "Ilegal", "Inofensiva"], c: 1 },
         { q: "Ahorrar invirtiendo con interés compuesto a tu favor requiere principalmente:", o: ["Poco tiempo", "Paciencia y tiempo", "Mucho dinero inicial", "Suerte"], c: 1 }
     ],
 
     s19: [ // P8: Proyecto de Vida Financiero
         { q: "El objetivo principal de un Proyecto de Vida Financiero es:", o: ["Hacerse millonario mañana", "Tener un plan estructurado para alcanzar metas con ahorro/inversión", "Pedir préstamos infinitos", "No gastar nunca"], c: 1 },
         { q: "Si quieres comprar un auto en 5 años, debes usar la fórmula de:", o: ["Geometría", "MCD", "Interés Compuesto / Valor Futuro", "Álgebra Lineal"], c: 2 },
         { q: "La 'inflación' hace que:", o: ["El dinero valga más", "El poder adquisitivo del dinero disminuya con el tiempo", "Los bancos regalen dinero", "Los intereses bajen"], c: 1 },
         { q: "Un buen plan financiero considera:", o: ["Gastar todo hoy", "Ignorar las deudas", "Ahorro, inversión, control de deudas y metas", "Solo el interés simple"], c: 2 },
         { q: "Presentar tu plan financiero a tus pares ayuda a:", o: ["Que te presten dinero", "Validar la realidad de tus proyecciones", "Presumir", "Ocultar errores"], c: 1 }
     ],

  

    // Módulo III y IV (Sesiones 20 - 40) -> Datos generados
    s20: [
        { q: "¿Cuál es la suma de los ángulos internos de un triángulo?", o: ["360°", "180°", "90°", "540°"], c: 1 },
        { q: "En la fórmula (n-2) × 180, ¿qué representa la n?", o: ["Nivel", "Nodos", "Número de lados", "Grados"], c: 2 },
        { q: "¿Cuánto suman los ángulos internos de un hexágono (n=6)?", o: ["720°", "540°", "1080°", "360°"], c: 0 },
        { q: "Si un polígono tiene 4 lados, la suma es...", o: ["180°", "270°", "360°", "400°"], c: 2 },
        { q: "¿Es posible un polígono cuyos ángulos internos sumen 200°?", o: ["Sí", "No, debe ser múltiplo de 180", "Solo si es irregular", "Depende del tamaño"], c: 1 }
    ],
    s21: [
        { q: "¿Cuál es el nombre del polígono de 7 lados?", o: ["Hexágono", "Heptágono", "Octágono", "Nonágono"], c: 1 },
        { q: "Un polígono es REGULAR si tiene:", o: ["Lados iguales", "Ángulos iguales", "Lados y ángulos iguales", "Forma circular"], c: 2 },
        { q: "¿Qué define a un polígono CÓNCAVO?", o: ["Tiene un ángulo > 180°", "Todos sus ángulos son < 180°", "Tiene 3 lados", "No tiene diagonales"], c: 0 },
        { q: "Un cuadrilátero tiene este número de vértices:", o: ["2", "4", "6", "8"], c: 1 },
        { q: "¿Cómo se llaman los segmentos que unen vértices NO consecutivos?", o: ["Lados", "Radio", "Diagonales", "Apotema"], c: 2 }
    ],
    s22: [
        { q: "¿Cuántas diagonales tiene un triángulo?", o: ["3", "1", "0", "2"], c: 2 },
        { q: "Fórmula para diagonales desde UN SOLO vértice:", o: ["n - 3", "n(n-3)/2", "360/n", "180(n-2)"], c: 0 },
        { q: "¿Cuánto suman los ángulos externos de un decágono?", o: ["1800°", "360°", "1080°", "720°"], c: 1 },
        { q: "Si un polígono tiene 9 diagonales totales, es un...", o: ["Cuadrilátero", "Pentágono", "Hexágono", "Heptágono"], c: 2 },
        { q: "Valor de un ángulo exterior en un cuadrado:", o: ["45°", "90°", "180°", "360°"], c: 1 }
    ],
    s23: [
        { q: "La fórmula para el área de un polígono regular es:", o: ["Base x Altura", "(P x a) / 2", "Lado x n", "Lado al cuadrado"], c: 1 },
        { q: "¿Qué representa la letra 'a' en la fórmula del área?", o: ["Altura total", "Ancho", "Apotema", "Ángulo"], c: 2 },
        { q: "Si un hexágono regular tiene lado 5, su perímetro es:", o: ["25", "30", "15", "60"], c: 1 },
        { q: "Un polígono regular de 3 lados es un:", o: ["Cuadrado", "Triángulo Equilátero", "Pentágono", "Círculo"], c: 1 },
        { q: "Suma de los lados de un polígono se llama:", o: ["Área", "Volumen", "Perímetro", "Apotema"], c: 2 }
    ],
    s24: [
        { q: "¿Cómo se llama el eje horizontal (x)?", o: ["Ordenadas", "Abscisas", "Origen", "Vector"], c: 1 },
        { q: "¿En qué cuadrante ambos valores (x, y) son negativos?", o: ["Cuadrante I", "Cuadrante II", "Cuadrante III", "Cuadrante IV"], c: 2 },
        { q: "Coordenadas del origen:", o: ["(1, 1)", "(0, 1)", "(1, 0)", "(0, 0)"], c: 3 },
        { q: "¿Hacia dónde te mueves si 'y' es positivo?", o: ["Arriba", "Abajo", "Derecha", "Izquierda"], c: 0 },
        { q: "¿Qué punto está sobre el eje x?", o: ["(2, 3)", "(0, 5)", "(4, 0)", "(-1, -1)"], c: 2 }
    ],
    s25: [
        { q: "¿Qué teorema es la base para calcular la distancia entre dos puntos?", o: ["Tales", "Pitágoras", "Euclides", "Newton"], c: 1 },
        { q: "Si la distancia es d = √(9 + 16), el resultado es:", o: ["25", "7", "5", "12"], c: 2 },
        { q: "¿Cómo se llama la diferencia (x2 - x1)?", o: ["Desplazamiento vertical", "Desplazamiento horizontal", "Hipotenusa", "Pendiente"], c: 1 },
        { q: "La distancia entre (0,0) y (3,0) es:", o: ["0", "3", "9", "6"], c: 1 },
        { q: "Si el resultado de d es √50, simplificado es:", o: ["2√5", "5√2", "10√5", "25"], c: 1 }
    ],
    s26: [
        { q: "En la sesión de hoy comparamos la geometría Analítica con la...", o: ["Trigonometría", "Geometría Sintética", "Aritmética", "Física"], c: 1 },
        { q: "El método de determinantes para áreas también se conoce como fórmula de...", o: ["Pitágoras", "Tales", "Gauss", "Newton"], c: 2 },
        { q: "En el método analítico (Gauss), ¿qué debes hacer con el PRIMER vértice al organizar la matriz?", o: ["Eliminarlo", "Sumarlo a todos", "Repetirlo al final", "Multiplicarlo por cero"], c: 2 },
        { q: "Para obtener un área positiva directamente, los vértices se recorren en sentido...", o: ["Horario", "Antihorario", "Aleatorio", "Hacia abajo"], c: 1 },
        { q: "¿En qué consiste el método SINTÉTICO para hallar áreas en el plano?", o: ["Usar determinantes", "Aplicar logaritmos", "Descomponer en figuras elementales", "Medir con regla"], c: 2 },
        { q: "Si el determinante te da un resultado negativo, ¿qué propiedad matemática lo vuelve positivo?", o: ["Valor absoluto", "Raíz cuadrada", "Elevar al cuadrado", "Dividir entre dos"], c: 0 },
        { q: "¿Por qué fracción se multiplica el determinante al final de la fórmula de Gauss?", o: ["Por 2", "Por 1/2", "Por Pi", "Por 0"], c: 1 },
        { q: "¿Cuál método es más rápido para un polígono irregular de 7 lados?", o: ["Sintético", "Dividir en triángulos", "Analítico (Determinantes)", "Transportador"], c: 2 },
        { q: "Si encerramos un polígono en un gran rectángulo y restamos las esquinas, usamos el método...", o: ["Analítico", "Algebraico", "De Gauss", "Sintético"], c: 3 },
        { q: "La geometría analítica permite calcular el área exacta usando únicamente...", o: ["Ángulos internos", "Coordenadas de los vértices", "El perímetro", "El apotema"], c: 1 }
    ],
    s27: [
        { q: "¿Qué fórmula geométrica utilizamos para calcular el perímetro en el plano?", o: ["Teorema de Tales", "Fórmula de Gauss", "Distancia entre dos puntos", "Punto medio"], c: 2 },
        { q: "Para calcular el perímetro de un pentágono, ¿cuántas distancias debes sumar?", o: ["3", "4", "5", "6"], c: 2 },
        { q: "¿Qué método analítico utilizamos para calcular el ÁREA del polígono?", o: ["Fórmula de Gauss", "Suma de distancias", "Ecuación de la recta", "Teorema de Pitágoras"], c: 0 },
        { q: "En la fórmula de área, los vértices se listan en sentido:", o: ["Aleatorio", "Horario", "De izquierda a derecha", "Antihorario"], c: 3 },
        { q: "Si el área calculada da negativo, aplicamos la propiedad de...", o: ["Dividir entre dos", "Valor absoluto", "Elevar al cuadrado", "Raíz cuadrada"], c: 1 },
        { q: "Para cerrar la figura en el cálculo del área, se repite al final:", o: ["El origen (0,0)", "El punto medio", "El último punto", "El primer punto"], c: 3 },
        { q: "El perímetro es medida de longitud, el área es medida de...", o: ["Volumen", "Superficie (cuadrática)", "Masa", "Distancia lineal"], c: 1 },
        { q: "Al calcular el perímetro de un triángulo ABC, sumas AB + BC y...", o: ["CA (para cerrar)", "Terminas ahí", "Divides entre 2", "Distancia al origen"], c: 0 },
        { q: "¿Por qué número se multiplica la matriz al final para hallar el área?", o: ["Por 2", "Por 0.5 (o 1/2)", "Por Pi", "Por 1"], c: 1 },
        { q: "La rama de las matemáticas que usa coordenadas (x,y) es la...", o: ["Geometría Sintética", "Geometría Euclidiana", "Geometría Analítica", "Aritmética"], c: 2 }
    ],
    s28: [
        { q: "En el método de determinantes, ¿qué punto se repite al final?", o: ["Ninguno", "El último", "El primero", "El del origen"], c: 2 },
        { q: "¿Qué significan las barras | | en la fórmula del área?", o: ["Raíz cuadrada", "Valor absoluto", "División", "Multiplicación"], c: 1 },
        { q: "Si el determinante da -20, ¿cuál es el área?", o: ["-10", "10", "20", "0"], c: 1 },
        { q: "¿Cuántos vértices se necesitan como mínimo para un polígono?", o: ["2", "3", "4", "1"], c: 1 },
        { q: "El área de un triángulo con base 4 y altura 3 es:", o: ["12", "7", "6", "24"], c: 2 }
    ],
    s29: [
        { q: "¿Cuál es el valor de y1 en el punto P(5, -2)?", o: ["5", "-2", "2", "0"], c: 1 },
        { q: "En y - y1 = m(x - x1), ¿qué representa 'm'?", o: ["El origen", "El eje x", "La pendiente", "El punto medio"], c: 2 },
        { q: "Si m = 0, ¿cómo es la recta?", o: ["Vertical", "Horizontal", "Inclinada 45°", "No existe"], c: 1 },
        { q: "Si x1 = 0 y y1 = 0, la recta pasa por:", o: ["El infinito", "El eje y", "El origen", "El eje x"], c: 2 },
        { q: "Resultado de y - 4 = 1(x - 2) en forma común:", o: ["y = x + 2", "y = x - 2", "y = 2x + 4", "y = x + 6"], c: 0 }
    ],
    s30: [
        { q: "En y = mx + b, ¿qué representa la letra 'b'?", o: ["La pendiente", "El eje X", "Ordenada al origen", "El punto final"], c: 2 },
        { q: "¿Cuál es la pendiente en la ecuación y = -3x + 8?", o: ["8", "-3x", "-3", "3"], c: 2 },
        { q: "Si b = 0, ¿por dónde pasa la recta?", o: ["Por el infinito", "Por el origen (0,0)", "No cruza Y", "Es vertical"], c: 1 },
        { q: "¿Qué forma tiene la recta si m = 0?", o: ["Vertical", "Inclinada 45°", "Horizontal", "Es un solo punto"], c: 2 },
        { q: "Si la recta sube de izquierda a derecha, la pendiente es:", o: ["Negativa", "Cero", "Inexistente", "Positiva"], c: 3 }
    ],
    s31: [
        { q: "Geométricamente, la solución de un sistema 2x2 representa:", o: ["Una línea", "El punto de intersección", "Líneas paralelas", "El área"], c: 1 },
        { q: "¿Qué aplicación digital se recomienda para validar gráficamente?", o: ["Excel", "Word", "Desmos", "Calculadora básica"], c: 2 },
        { q: "En el método de Suma y Resta (Eliminación), el objetivo principal es:", o: ["Multiplicar", "Graficar", "Eliminar una variable", "Usar fracciones"], c: 2 },
        { q: "Si dos rectas son paralelas, el sistema tiene...", o: ["Una solución", "Infinitas", "Ninguna", "Dos"], c: 2 },
        { q: "Si x + y = 10 y x = 7, ¿cuánto vale y?", o: ["3", "-3", "17", "7"], c: 0 },
        { q: "En sustitución, el primer paso lógico es:", o: ["Sumar", "Graficar", "Despejar una variable", "Adivinar"], c: 2 },
        { q: "¿Por qué llamamos al sistema '2x2'?", o: ["Multiplicamos por 2", "Dos ecuaciones, dos incógnitas", "Resultado es 4", "Dos planos"], c: 1 },
        { q: "¿Cómo verificas algebraicamente tu punto de intersección?", o: ["Sustituyendo en ambas ecuaciones", "Dibujando", "Cambiando signos", "No se puede"], c: 0 },
        { q: "Si y = 2x, y x + y = 9, al sustituir obtenemos:", o: ["x + 2x = 9", "2y = 9", "x + x = 9", "y + 2y = 9"], c: 0 },
        { q: "Desmos sirve para validar mediante la interpretación...", o: ["Aritmética", "Estadística", "Gráfica", "Financiera"], c: 2 }
    ],
    s32: [
        { q: "En mezclas químicas, la primera ecuación generalmente representa:", o: ["Cantidad total", "Porcentaje acidez", "Costo", "Tiempo"], c: 0 },
        { q: "Si mezclamos 'x' litros al 10% con 'y' al 50%, el soluto de x es:", o: ["10x", "0.10x", "x + 10", "10% / x"], c: 1 },
        { q: "En la granja (cabezas y patas), la ecuación de 'cabezas' es:", o: ["2x+4y=Total", "x+y=Cabezas", "4x=y", "x*y=Cabezas"], c: 1 },
        { q: "Si x=gallinas y y=cerdos, la ecuación de PATAS es:", o: ["x+y=Patas", "4x+2y=Patas", "2x+4y=Patas", "2x+2y=Patas"], c: 2 },
        { q: "Si Juan tiene el doble de la edad de María:", o: ["J+2=M", "J=2M", "2J=M", "J+M=2"], c: 1 },
        { q: "La suma de dos números es 45. Algebraicamente es:", o: ["x-y=45", "xy=45", "x+y=45", "x/y=45"], c: 2 },
        { q: "Boletos de adulto ($5) y niño ($3). ¿Ganancia total?", o: ["x+y=8", "5x*3y=Total", "5x+3y=Ganancia", "8xy=Total"], c: 2 },
        { q: "¿Por qué hacer una tabla en mezclas?", o: ["Graficar", "Separar Cantidad, % y Soluto", "Pendiente", "Áreas"], c: 1 },
        { q: "Obtener 100 litros finales, la ecuación es:", o: ["x-y=100", "0.100x=y", "x+y=100", "xy=100"], c: 2 },
        { q: "La dificultad en Problemas de Contexto es...", o: ["Decimales", "Traducir al lenguaje algebraico", "Fracciones", "Graficar"], c: 1 }
    ],
    s33: [
        { q: "¿Cuántas soluciones tiene un sistema de dos rectas paralelas?", o: ["Una", "Dos", "Ninguna", "Infinitas"], c: 2 },
        { q: "Si dos rectas son coincidentes, el sistema tiene...", o: ["Infinitas", "Cero", "Una", "Dos"], c: 0 },
        { q: "Si dos planes telefónicos nunca cuestan lo mismo, sus gráficas son:", o: ["Secantes", "Perpendiculares", "Coincidentes", "Paralelas"], c: 3 },
        { q: "Si obtienes '0 = 0', significa que:", o: ["No hay solución", "Error", "Infinitas soluciones", "Es cero"], c: 2 },
        { q: "Si obtienes '0 = 5', geométricamente tienes rectas...", o: ["Que chocan", "Paralelas", "Coincidentes", "Triangulares"], c: 1 },
        { q: "Para formar líneas paralelas, deben tener:", o: ["Diferente pendiente", "Misma pendiente, diferente 'b'", "Misma ecuación", "Negativas"], c: 1 },
        { q: "El sistema y = 2x+1 y y = 2x-5, ¿cuántas soluciones tiene?", o: ["Una", "Cero", "Infinitas", "Dos"], c: 1 },
        { q: "¿Qué representa la 'Solución Única'?", o: ["Paralelas", "Glitch", "Coincidentes", "Rectas secantes en un punto"], c: 3 },
        { q: "Si la segunda ecuación es el triple de la primera (x+y=2 y 3x+3y=6):", o: ["Sin solución", "Coincidentes (Infinitas)", "Incorrecto", "Única"], c: 1 },
        { q: "El número máximo de soluciones para un sistema lineal es:", o: ["1", "2", "3", "Infinitas"], c: 3 }
    ],
    s34: [
        { q: "¿Qué representa la gráfica de una desigualdad lineal?", o: ["Un punto", "Línea finita", "Toda una región", "Círculo"], c: 2 },
        { q: "La zona sombreada de soluciones válidas se llama:", o: ["Zona peligro", "Región factible", "Punto ciego", "Eje"], c: 1 },
        { q: "Si utiliza ≤ o ≥, la línea de frontera es:", o: ["Punteada", "Roja", "Sólida", "Transparente"], c: 2 },
        { q: "Si utiliza < o >, la línea de frontera es:", o: ["Punteada", "Sólida", "Gruesa", "No se dibuja"], c: 0 },
        { q: "El mejor punto de prueba (radar) si la línea NO pasa por el centro:", o: ["(100,100)", "(0,0)", "(-1,-1)", "(5,5)"], c: 1 },
        { q: "Si sustituyes (0,0) y es VERDADERO:", o: ["Sombreas el lado del (0,0)", "Lado contrario", "Borras línea", "Cambias punto"], c: 0 },
        { q: "Si sustituyes (0,0) y es FALSO:", o: ["Lado del (0,0)", "Lado opuesto al (0,0)", "No sombreas", "Otra recta"], c: 1 },
        { q: "Presupuesto $100. x=$10, y=$20. La desigualdad es:", o: ["10x+20y > 100", "10x+20y = 100", "10x+20y ≤ 100", "100x+100y < 20"], c: 2 },
        { q: "y ≥ x + 2. ¿Hacia dónde sombreas usualmente?", o: ["Debajo", "Sobre", "Encima", "Derecha"], c: 2 },
        { q: "La solución de un SISTEMA de desigualdades está donde...", o: ["Líneas cruzan", "Regiones sombreadas se superponen", "No hay sombra", "Restan colores"], c: 1 }
    ],
    s35: [
        { q: "¿Para qué se utiliza la Programación Lineal?", o: ["Círculos", "Encontrar el mejor resultado (optimizar)", "Cuadráticas", "Distancias"], c: 1 },
        { q: "La ecuación que representa la meta a maximizar o minimizar se llama:", o: ["Recta", "Restricción", "Función Objetivo", "Eje"], c: 2 },
        { q: "Si la meta es ganar dinero, ¿qué querrá hacer con Z?", o: ["Minimizarla", "Cero", "Maximizarla", "Dividirla"], c: 2 },
        { q: "Los límites de dinero, tiempo o materiales se conocen como:", o: ["Vértices", "Restricciones", "Ganancias", "Variables"], c: 1 },
        { q: "Las restricciones se representan utilizando:", o: ["Signos = ", "Signos ≤, ≥", "Negativos", "Raíces"], c: 1 },
        { q: "Según el Teorema Fundamental, la solución óptima se encuentra en:", o: ["El centro", "El origen", "Los vértices de la región factible", "Fuera"], c: 2 },
        { q: "Si Z = 10x + 5y, ¿ganancia en (3, 4)?", o: ["50", "30", "15", "45"], c: 0 },
        { q: "Vértices: A(0,0)->Z=0, B(0,5)->Z=25, C(4,2)->Z=30. Para MAXIMIZAR eliges:", o: ["A", "B", "C", "Ninguno"], c: 2 },
        { q: "Si busca 'menor costo de producción', estamos intentando:", o: ["Maximizar", "Eliminar", "Minimizar", "Cambiar negocio"], c: 2 },
        { q: "La letra 'Z' en Programación Lineal representa:", o: ["Eje horizontal", "Ganancia/costo total de Función Objetivo", "Variables", "Restricción"], c: 1 }
    ],
    s36: [
        { q: "Para el método gráfico se recomienda el uso de:", o: ["Calculadora", "Hojas milimétricas", "Compás", "Transportador"], c: 1 },
        { q: "Una vez dibujada la región factible, el siguiente paso es la...", o: ["Evaluación de vértices", "Creación de variables", "Eliminar Z", "Decisiones"], c: 0 },
        { q: "¿Por qué el óptimo está en una esquina?", o: ["Fácil cálculo", "La función Z alcanza su límite en los extremos", "Regla", "No siempre"], c: 1 },
        { q: "Al evaluar Z = 10x+20y, para MAXIMIZAR elegiremos el punto que...", o: ["Valor más bajo", "x=0", "Dé el valor numérico más alto", "Origen"], c: 2 },
        { q: "Si Z representa COSTOS, ¿cuál será el óptimo?", o: ["Valor más alto", "Valor más bajo", "Punto medio", "Suma de vértices"], c: 1 },
        { q: "Evalúa (5, 5) en Z = 100x + 100y:", o: ["1000", "500", "200", "2500"], c: 0 },
        { q: "(0,10)->Z=100 y (10,0)->Z=150. Para maximizar, la DECISIÓN es:", o: ["0 de x, 10 de y", "10 de x, 0 de y", "Nada", "5 y 5"], c: 1 },
        { q: "Si dos vértices adyacentes dan la misma ganancia máxima:", o: ["Sin solución", "Mal cálculo", "Cualquier punto en el segmento que los une es óptimo", "El de x mayor"], c: 2 },
        { q: "El paso final de traducir los números a una acción real se llama:", o: ["Factorización", "Toma de decisiones", "Restricción", "Interpolación"], c: 1 },
        { q: "Si el óptimo es (0, 20) (x=mesas, y=sillas), estratégicamente significa:", o: ["Hacer ambas", "Fabricar solo 20 sillas", "Perder dinero", "20 mesas, 0 sillas"], c: 1 }
    ],
    s37: [
        { q: "En un proyecto de optimización, el objetivo es minimizar costos o...", o: ["Graficar", "Maximizar utilidad", "Gastar recursos", "Eliminar variables"], c: 1 },
        { q: "Las limitantes de un negocio (dinero, tiempo) se representan como:", o: ["Z", "Vértices", "Restricciones (Desigualdades)", "Coordenadas"], c: 2 },
        { q: "La ecuación del dinero total a ganar se llama:", o: ["Ecuación lineal", "Restricción", "Función Objetivo (Z)", "Teorema"], c: 2 },
        { q: "En el Informe de Estrategia final, lo más importante es:", o: ["Color", "La interpretación real y toma de decisiones", "Fracciones", "Dibujar"], c: 1 },
        { q: "Si vendes camisetas (x) y sudaderas (y), ¿qué son x e y?", o: ["Renta", "Variables de decisión", "Tiempo", "Ganancias"], c: 1 },
        { q: "La ganancia máxima en la gráfica está en:", o: ["Origen", "Centro", "Vértices de región factible", "Fuera"], c: 2 },
        { q: "Presupuesto $500. Brownie $10, galleta $5. Restricción:", o: ["10x+5y=500", "10x+5y≤500", "10x+5y≥500", "x+y≤500"], c: 1 },
        { q: "¿Por qué un negocio se modela con x≥0 e y≥0?", o: ["No hay cantidades negativas de productos", "Bonito", "Regla", "Difícil"], c: 0 },
        { q: "Z = 20x + 30y, vértice óptimo (10, 5), ganancia máxima:", o: ["200", "150", "350", "500"], c: 2 },
        { q: "El éxito de un proyecto PL radica en:", o: ["Fórmulas", "Cálculo mental", "Plantear el modelo desde lenguaje natural", "Calculadora"], c: 2 }
    ],
    s38: [
        { q: "Objetivo principal de la Feria de Matemáticas:", o: ["Examen", "Integrar y exponer aprendizajes a través de proyectos", "Tema nuevo", "Fórmulas"], c: 1 },
        { q: "En la exposición, ¿qué es la función objetivo?", o: ["La meta a maximizar o minimizar", "Límite", "Origen", "Tiempo"], c: 0 },
        { q: "La 'Retroalimentación entre pares' debe ser:", o: ["Destructiva", "Desleal", "Constructiva y respetuosa", "Silencio"], c: 2 },
        { q: "Proyecto de ahorro a largo plazo usa:", o: ["Distancia", "Interés Compuesto", "Pitágoras", "Gauss"], c: 1 },
        { q: "En la exposición PL, las restricciones representan:", o: ["Los límites de recursos", "Ganancias", "Clientes", "Logo"], c: 0 },
        { q: "Herramienta gráfica para comprobar 'región factible':", o: ["Word", "Desmos / GeoGebra", "PowerPoint", "Calculadora"], c: 1 },
        { q: "En Z = 50x + 30y, Z es:", o: ["Productos", "Eje vertical", "La ganancia a optimizar", "Horas"], c: 2 },
        { q: "Mayor beneficio de la Integración de Aprendizajes:", o: ["Ver utilidad real y práctica de las matemáticas", "Rápido", "Dibujar", "Evitar tareas"], c: 0 },
        { q: "El Teorema Fundamental dicta que la ganancia máxima está en:", o: ["Centro", "Vértice de región factible", "Origen", "Cualquier lado"], c: 1 },
        { q: "Además de matemáticas, en un pitch es fundamental:", o: ["Hablar rápido", "Argumentación lógica y claridad", "Leer texto", "Ocultar errores"], c: 1 }
    ],
    s39: [
        { q: "El doble de un número más tres:", o: ["x^2+3", "2x+3", "2(x+3)", "x+2/3"], c: 1 },
        { q: "MCD de 12 y 18:", o: ["6", "2", "36", "3"], c: 0 },
        { q: "Interés que suma ganancias al capital para el siguiente periodo:", o: ["Simple", "Lineal", "Compuesto", "Directo"], c: 2 },
        { q: "Método para área de polígono en el plano:", o: ["Sustitución", "Pitágoras", "Determinantes (Gauss)", "Punto Medio"], c: 2 },
        { q: "Distancia entre (0,0) y (3,4):", o: ["7", "5", "25", "12"], c: 1 },
        { q: "Pendiente en y = 5x - 2:", o: ["-2", "y", "x", "5"], c: 3 },
        { q: "Solución geométrica de sistema 2x2:", o: ["Paralela", "Origen", "Intersección de dos rectas", "Área"], c: 2 },
        { q: "Si un sistema da '0 = 5':", o: ["Paralelas (Sin solución)", "Mal suma", "Infinitas", "Respuesta 5"], c: 0 },
        { q: "Zona sombreada con todas las restricciones:", o: ["Punto ciego", "Región Factible", "Función Objetivo", "Abscisas"], c: 1 },
        { q: "Ganancia máxima en PL está en:", o: ["Centro", "Origen", "Vértices de región factible", "Eje Y"], c: 2 }
    ],
    s40: [
        { q: "El doble de un número disminuido en cinco:", o: ["2x+5", "x/2-5", "2x-5", "5-2x"], c: 2 },
        { q: "Interés que suma ganancias al capital inicial:", o: ["Simple", "Compuesto", "Tasa", "Descuento"], c: 1 },
        { q: "Fórmula de distancia se deriva del:", o: ["Pitágoras", "Tales", "Gauss", "Arquímedes"], c: 0 },
        { q: "Para el Área exacta del polígono usamos:", o: ["Suma lados", "Base x altura", "Determinantes (Gauss)", "Punto medio"], c: 2 },
        { q: "En y = mx + b, 'b' es:", o: ["Inclinación", "Ordenada al origen", "Eje X", "Máximo"], c: 1 },
        { q: "Sistema 2x2 que cruza en un punto tiene:", o: ["Infinitas", "Ninguna", "Solución única", "Mala gráfica"], c: 2 },
        { q: "Si NO TIENE SOLUCIÓN (0=5), las rectas son:", o: ["Secantes", "Perpendiculares", "Coincidentes", "Paralelas"], c: 3 },
        { q: "Espacio que cumple todas las restricciones de PL:", o: ["Imposible", "Función", "Región Factible", "Ciego"], c: 2 },
        { q: "El valor óptimo según Teorema Fundamental está en:", o: ["Vértices", "Centro", "Origen", "Eje X"], c: 0 },
        { q: "Objetivo del Pensamiento Matemático:", o: ["Pasar", "Ecuaciones", "Memorizar", "Traducir problemas reales para tomar decisiones"], c: 3 }
    ]
};

/* ==========================================================================
   3. MOTOR DE RENDERIZADO DEL QUIZ (KAHOOT STYLE)
   ========================================================================== */
let globalQIndex = 0;
let globalScore = 0;
let currentSessionData = [];


/**
 * Inicializa el Quiz para una sesión específica
 * @param {number} sessionNumber - Número de la sesión (ej. 26)
 * 
 */

function iniciarSesion(sessionNumber) {
    const sessionKey = `s${sessionNumber}`;
   
    if (quizDatabase[sessionKey] && quizDatabase[sessionKey].length > 0) {
        currentSessionData = quizDatabase[sessionKey];
        globalQIndex = 0;
        globalScore = 0;
        console.log(currentSessionData);
        renderizarPregunta();
    } else {
        console.error(`Datos de la sesión ${sessionNumber} no encontrados.`);
        document.getElementById('quiz-engine').innerHTML = "<h3 style='color:red;'>Error: Base de datos de la sesión no disponible.</h3>";
    }
}

/**
 * Renderiza la pregunta actual en el DOM
 */
function renderizarPregunta() {
    const qTracker = document.getElementById('q-tracker') || document.getElementById('quiz-tracker') || document.getElementById('q-num') || document.getElementById('quiz-container');
    const qText = document.getElementById('q-text') || document.getElementById('question-text') || document.getElementById('question-label');
    const optionsContainer = document.getElementById('quiz-options') || document.querySelector('.k-options') || document.querySelector('.kahoot-grid');
   
    if (globalQIndex < currentSessionData.length) {
        const item = currentSessionData[globalQIndex];
    
        if (qTracker) qTracker.innerText = `Pregunta ${globalQIndex + 1} de ${currentSessionData.length}`;
        if (qText) qText.innerText = item.q;
        console.log(item.q);
        
        for (let i = 0; i < 4; i++) {
            const optSpan = document.getElementById(`opt-${i}`);
            if (optSpan) optSpan.innerText = item.o[i];
           
        }
        
        // Renderizar MathJax si está presente
        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.log('MathJax Error:', err));
        }

    } else {
        mostrarPantallaFinal();
    }
}

/**
 * Verifica la respuesta seleccionada y avanza
 * @param {number} selectedIdx - Índice del botón clickeado (0-3)
 */
function checkAns(selectedIdx) {
    // Si la propiedad es 'c' o 'correct'
    const correctAns = currentSessionData[globalQIndex].c !== undefined ? currentSessionData[globalQIndex].c : currentSessionData[globalQIndex].correct;
    
    if (selectedIdx === correctAns) {
        globalScore++;
    }
    
    globalQIndex++;
    renderizarPregunta();
}

// Compatibilidad con archivos anteriores (alias de función)
const evaluateQuiz = checkAns;
const checkQuiz = checkAns;
const validateAns = checkAns;
const checkAnswer = checkAns;
const verifyQ = checkAns;

/**
 * Renderiza la pantalla final del Quiz
 */
function mostrarPantallaFinal() {
    const container = document.getElementById('quiz-container') || document.querySelector('.quiz-wrapper') || document.querySelector('.kahoot-style') 
    
    const isApproved = (globalScore / currentSessionData.length) >= 0.8;
    const finalMsg = isApproved ? "¡EXCELENTE RENDIMIENTO! Dominio de la competencia alcanzado." : "REQUIERE REVISIÓN. Es necesario repasar los conceptos.";
    const colorTheme = isApproved ? "#00E5FF" : "#FF003C";
    console.log(container);

    container.innerHTML=`
        <div style="text-align:center; padding: 30px;">
            <h2 style="color:${colorTheme}; font-size:2.5rem; margin-bottom: 20px;">SIMULACIÓN COMPLETADA</h2>
            <p style="font-size:1.5rem;">Aciertos: <strong>${globalScore} / ${currentSessionData.length}</strong></p>
            <p style="margin: 20px 0; font-size:1.2rem;">${finalMsg}</p>
            <button onclick="location.reload()" style="margin-top:20px; padding:15px 35px; background:${colorTheme}; border:none; border-radius:8px; font-weight:bold; font-size:1.1rem; cursor:pointer;">Reiniciar Módulo</button>
        </div>
    `;
}

/* ==========================================================================
   4. INICIALIZADOR AUTOMÁTICO BÚSQUEDA DE SESIÓN
   ========================================================================== */
// El script intentará autodetectar en qué sesión está basándose en el título o url
window.onload = function() {
    const titleText = document.title.toLowerCase();
    // Expresión regular para buscar "s" seguido de números (ej. s26, s-35, sesion 40)
    const match = titleText.match(/s[- ]?(\d+)/); 
    
    if (match && match[1]) {
        iniciarSesion(parseInt(match[1]));
    } else {
        // Fallback por defecto si no detecta el número
        console.warn("No se pudo detectar el número de sesión. Iniciando S40 por defecto.");
        iniciarSesion(40); 
    }
};