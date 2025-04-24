# Prompt para Generación Inicial de Documentación de Proyecto

**Objetivo:** Generar un conjunto inicial de 13 documentos fundamentales en la carpeta `/docs` para un nuevo proyecto, basándose en la información proporcionada.

**Instrucción Principal:** Analiza la información del proyecto proporcionada a continuación y genera el contenido completo para cada uno de los siguientes archivos de documentación. Asegúrate de que cada archivo contenga la información solicitada en su descripción y que el conjunto sirva como una base sólida para la documentación del proyecto.

**Información Requerida del Proyecto (Preguntas para el Usuario):**

Antes de generar los documentos, por favor, proporciona la siguiente información sobre el proyecto:

1.  **Nombre del Proyecto:** ¿Cuál es el nombre oficial o de trabajo del proyecto?
2.  **Visión Central:** Describe en una frase clara e inspiradora el propósito fundamental y el estado final deseado del proyecto.
3.  **Objetivos Principales:** Enumera de 3 a 5 metas concretas, medibles y de alto nivel que el proyecto busca alcanzar.
4.  **Problema/Necesidad:** ¿Qué problema específico resuelve este proyecto o qué necesidad satisface para sus usuarios o stakeholders?
5.  **Usuarios Objetivo:** ¿Quiénes son los principales usuarios o el público objetivo de este proyecto?
6.  **Funcionalidad Principal:** Describe brevemente la funcionalidad clave o las características esenciales del proyecto (a alto nivel).
7.  **Stack Tecnológico (Propuesto/Existente):** ¿Qué tecnologías (lenguajes, frameworks, APIs, etc.) se planean usar o ya existen? ¿Hay alguna restricción tecnológica?
8.  **Recursos Existentes:** ¿Existe algún código fuente, repositorio, diseño, o documentación previa relevante? (Proporcionar enlaces o descripciones si es posible).
9.  **Instalación/Configuración (Anticipada):** ¿Se prevén pasos específicos para la configuración del entorno de desarrollo o la instalación por parte del usuario?
10. **Contribución:** ¿Será un proyecto de código abierto? ¿Hay planes específicos para las contribuciones?
11. **Notas Iniciales/Contexto:** ¿Hay alguna nota de desarrollo, decisión de diseño importante o contexto histórico relevante que deba conocerse desde el principio?

**Documentos a Generar (en `/docs`):**

1.  **`01_project_overview.md`:**
    - **Contenido:** Visión Central, Objetivos Principales (3-5), Problema/Necesidad Abordada, Descripción General de la Solución. Debe servir como la "Estrella Polar" del proyecto.
2.  **`02_requirements.md`:**
    - **Contenido:** Lista inicial de Requisitos Funcionales (FR) y No Funcionales (NFR) basados en la funcionalidad principal y los objetivos descritos. Numerar cada requisito (FR-01, NFR-01, etc.).
3.  **`03_features.md`:**
    - **Contenido:** Desglose detallado de cada característica principal identificada. Para cada una: ID (FEAT-01), Descripción, Requisitos asociados (FR/NFR), Operación detallada (pasos conceptuales), Casos Límite (si se anticipan), Reglas de Validación (si aplica), Manejo de Errores (conceptual).
4.  **`04_project_structure.md`:**
    - **Contenido:** Descripción inicial de la arquitectura propuesta (estilo, patrones clave), Componentes Principales (archivos/módulos y sus responsabilidades), Comunicación entre componentes (conceptual), Estructura de Base de Datos (si aplica, o indicar N/A), Flujo de Datos (ejemplo de caso de uso típico), Stack Tecnológico (resumen). Incluir un diagrama Mermaid simple si ayuda (ej. `sequenceDiagram`).
5.  **`05_tech-stack.md`:**
    - **Contenido:** Justificación detallada de las tecnologías elegidas (o propuestas). Para cada tecnología principal (lenguaje, framework, API, entorno): Razón de la elección, Interacción con otros componentes. Mencionar tecnologías excluidas y por qué (si es relevante).
6.  **`06_implementation.md`:**
    - **Contenido:** Enfoque de Desarrollo (metodología, estrategia de branching propuesta), Estándares de Codificación (referencia a reglas si existen, principios clave), Estimaciones de Tiempo (indicar TBD inicialmente), Directrices Técnicas y Buenas Prácticas (principios clave de implementación, seguridad, rendimiento, etc.).
7.  **`07_setup_and_installation.md`:**
    - **Contenido:** Guía inicial para la configuración del entorno de desarrollo (prerrequisitos, pasos para clonar/instalar dependencias/ejecutar localmente) y para la instalación del usuario final (si aplica, describir el método previsto).
8.  **`08_usage_guide.md`:**
    - **Contenido:** Guía paso a paso sobre cómo un usuario final utilizaría la funcionalidad principal del proyecto. Incluir prerrequisitos, flujo de trabajo típico, resultado esperado y solución de problemas básicos.
9.  **`09_contribution_guidelines.md`:**
    - **Contenido:** Directrices para contribuir al proyecto: cómo reportar bugs, sugerir mejoras, proceso de contribución de código (fork, branch, PR, revisión), referencia a un Código de Conducta (indicar si se creará).
10. **`10_changelog.md`:**
    - **Contenido:** Archivo inicial de Changelog siguiendo el formato "Keep a Changelog". Incluir una entrada para la versión inicial `[1.0.0]` o `[Unreleased]` con secciones `Added`, `Changed`, `Fixed`.
11. **`11_to_do_list.md`:**
    - **Contenido:** Lista inicial de tareas pendientes basada en funcionalidades no cubiertas en la v1.0, mejoras identificadas, bugs conocidos (si los hay), y tareas de documentación futuras. Usar formato de checklist `[ ]`.
12. **`12_development_notes.md`:**
    - **Contenido:** Notas iniciales de desarrollo basadas en la información proporcionada. Incluir secciones como: Resumen y Estado Actual, Detalles/Decisiones Clave de Implementación (iniciales), Log de Desarrollo (vacío inicialmente), Futuras Mejoras/Ideas (resumen), Stack Tecnológico (resumen), Desafíos Potenciales.
13. **`13_development_prompts.md`:**
    - **Contenido:** Colección inicial de prompts de ejemplo que podrían ser útiles para generar código o documentación específica para _este_ proyecto, basados en su naturaleza y tecnología. Incluir ejemplos para configuración, lógica central, estilos, documentación específica del proyecto.

**Acción:** Una vez recibida la información del proyecto, procede a generar el contenido completo para cada uno de los 13 archivos `.md` y guárdalos en la carpeta `/docs`.
