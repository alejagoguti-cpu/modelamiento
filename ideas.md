# Dirección de diseño: Atlas de Ciudad

## Referencia de estructura

El sitio de referencia, ZiBo Bogotá, es la especificación de experiencia para este proyecto. Se conservarán sus principios de composición: una barra superior oscura y compacta; un arranque editorial de alto impacto; bloques narrativos de proyecto; indicadores territoriales; beneficios presentados como recorridos visuales; y una sección de exploración cartográfica protagonista. La implementación utilizará **marca, textos, datos, recursos visuales y tratamiento gráfico propios**, por lo que no reutilizará contenidos ni activos de la referencia.

## Diseño elegido

**Movimiento de diseño.** Cartografía editorial contemporánea, inspirada en atlas urbanos, señalética de transporte y publicaciones de arquitectura latinoamericana.

**Principios fundamentales.** La interfaz privilegia orientación antes que ornamentación; combina capas cartográficas y narración espacial; utiliza información numérica como textura editorial; y ofrece una lectura clara a través de contrastes tipográficos, códigos de color y ritmo vertical.

**Filosofía de color.** El fondo mineral claro comunica precisión y materia urbana. El carbón profundo sostiene la navegación y los textos de mayor jerarquía. El amarillo ámbar funciona como marca de localización y acción, mientras el verde río y el azul mapa diferencian capas del territorio sin convertir la interfaz en una paleta decorativa.

**Paradigma de composición.** La página se organiza como un recorrido longitudinal de atlas: una columna lateral de coordenadas dialoga con relatos y datos de ancho variable; el mapa ocupa el papel de una lámina territorial que se despliega a escala completa.

**Elementos distintivos.** Líneas de coordenadas discretas, marcos de leyenda técnica y marcadores circulares de gran presencia establecen una identidad cartográfica recurrente.

**Filosofía de interacción.** Cada interacción debe responder como una herramienta de exploración: filtros, leyenda y marcadores aclaran el territorio sin interrumpir el recorrido de lectura.

**Animación.** Se usarán apariciones breves de opacidad y desplazamiento, transiciones de capa de menos de 300 ms y una entrada escalonada para las tarjetas. El mapa responde a filtros con cambios suaves de color y enfoque. Se respetará la preferencia de reducción de movimiento.

**Sistema tipográfico.** `DM Mono` acompaña coordenadas, etiquetas y cifras con un carácter técnico. `Manrope` dirige títulos y lectura general mediante una jerarquía contundente, con títulos en altas parciales y texto de alta legibilidad.

**Esencia de marca.** **RAPOT** es un atlas digital para entender las oportunidades y relaciones de un territorio urbano en transformación. Su personalidad es **rigurosa, cercana y prospectiva**.

**Voz de marca.** Los titulares nombran espacios y posibilidades con precisión; los llamados a la acción invitan a observar y descubrir, sin promesas genéricas. Ejemplos: “La ciudad empieza donde las capas se encuentran.” y “Ubica una historia, sigue una conexión.”

**Logotipo y símbolo.** Un nudo geométrico de cuatro segmentos curvos, inspirado en los cruces viales y las intersecciones de coordenadas, representa conexiones urbanas. Se emplea sin texto como símbolo y se acompaña de la palabra RAPOT en letras de ancho técnico.

**Color de marca.** **Ámbar de nodo — #F2B84B**. Este color identifica los puntos activos, las acciones principales y el pulso territorial.

## Decisiones de estilo

El explorador siempre conserva una cartografía visible y elaborada: cuadrícula de coordenadas, traza de recorrido, marcadores circulares y leyenda técnica, incluso si la capa de mapa se encuentra en estado de carga. Todas las secciones mayores mantienen al menos un código de atlas —un índice, una línea, una marca, una traza o una etiqueta monoespaciada— para dar continuidad al sistema. El ámbar se reserva para acciones, fechas, cifras, ubicaciones activas y avisos territoriales; las superficies extensas se interpretan como una placa de boletín y no como relleno decorativo.

RAPOT emplea verde río exclusivamente para paisaje y conexión ecológica, azul mapa para rutas y lectura espacial, y ámbar de nodo para acciones y puntos activos. Su tono redacta observaciones territoriales concretas antes que explicaciones institucionales genéricas.

### Movimiento del explorador

El visor de ZIBo abre con una transición de carga de tres barras que se desvanece suavemente al estar disponible. Los controles de lectura territorial muestran una respuesta inmediata al seleccionar una capa: el botón cambia de estado, una lámina de color cruza la cartografía y una ficha actualiza el foco de lectura. La entrada al mapa activa un marco técnico sutil, sin bloquear la interacción directa con el visor oficial. Todas las transiciones se limitan a opacidad, color y transformaciones de menos de 420 ms y se desactivan cuando el sistema solicita movimiento reducido.

## Refinamiento de dirección de arte

RAPOT evoluciona hacia una **monografía de arquitectura y territorio**: menos interfaz promocional, más página de archivo editorial. La tipografía de exhibición pasa a una serif de contraste alto y con aire tipográfico; el sans queda reservado para la lectura funcional y el monoespaciado para los datos. El color se concentra en **negro de tinta**, **papel de algodón**, **latón envejecido** y un verde bosque muy contenido. Los módulos abandonan la lógica de tarjetas de producto: se vuelven láminas con bordes finos, notas de margen, imágenes desaturadas y proporciones deliberadas. La interacción deja de “saltar”; en su lugar, usa variaciones casi imperceptibles de encuadre, sombra y revelado de información.

### Paleta blanco y azul

La edición cromática de RAPOT se limita a **blanco editorial** `#F8FBFF`, **azul de archivo** `#0A4D88`, **azul de plano** `#2679C6`, **azul niebla** `#E8F1F8` y **azul noche** `#071B31`. El azul de archivo reemplaza los antiguos acentos cálidos en acciones, puntos activos y datos clave. El azul niebla delimita láminas y fondos secundarios; el azul noche enmarca el hero, navegación y pie de página. La fotografía adopta un tratamiento de contraste bajo con una veladura azul, creando una identidad más precisa, calma y cartográfica.
