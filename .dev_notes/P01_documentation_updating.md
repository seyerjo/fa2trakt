# Prompt para Actualización de Documentación del Proyecto por Feature Completada

**Objetivo:** Actualizar la documentación existente en la carpeta `/docs` para reflejar los cambios introducidos por una feature recientemente completada, utilizando el código fuente y la guía de seguimiento como referencia.

**Instrucción Principal:** Ejecuta el siguiente proceso para actualizar los documentos de documentación relevantes en `/docs` basándote en la feature finalizada.

**Proceso de Actualización de Documentación:**

Para actualizar la documentación después de completar una feature, sigue estos pasos:

1.  **Análisis del Código Fuente:** Revisa y analiza a fondo el código fuente de la feature que se acaba de terminar. Identifica:

    - La funcionalidad exacta implementada.
    - Los cambios realizados a funcionalidades existentes.
    - Nuevos requisitos funcionales o no funcionales cubiertos o afectados.
    - Casos límite, validaciones y manejo de errores específicos implementados.
    - Cambios en la estructura del proyecto, componentes o dependencias relacionados con la feature.
    - Detalles de implementación importantes o decisiones de diseño tomadas.

2.  **Consulta de la Guía de Seguimiento:** Lee el documento `N00_project_tracking.md`. Presta especial atención a la tabla de seguimiento para identificar qué documentos se marcan con una "Frecuencia de Seguimiento" de "Continuo / Por Feature" o similar, ya que son los candidatos principales para ser actualizados.

3.  **Lectura de Documentos Existentes:** Para cada documento identificado como candidato a actualización en el paso 2, lee su contenido actual desde la carpeta `/docs`. Es crucial entender el estado actual de la documentación antes de modificarla.

4.  **Generación de Contenido Actualizado:** Basándote en el análisis del código fuente (Paso 1), el propósito de cada documento (según la descripción en el prompt de generación inicial y la guía de seguimiento), y el contenido actual del documento (Paso 3), genera el contenido _actualizado_ para cada uno de esos archivos.

    - **Mantén el Formato:** Asegúrate de preservar el formato Markdown existente, incluyendo encabezados, listas, bloques de código, y especialmente los diagramas Mermaid y su sintaxis.
    - **Integra los Cambios:** Incorpora la información de la nueva feature de manera coherente dentro de las secciones relevantes de cada documento.
    - **Refina la Redacción:** Asegura que la redacción sea clara, concisa y precisa, reflejando el estado actual del proyecto después de la implementación de la feature.

5.  **Documentos Clave a Considerar (basado en N00_project_tracking.md):**
    - `docs/requirements.md`: Añadir o modificar requisitos funcionales o no funcionales si la feature los introduce o afecta.
    - `docs/features.md`: Añadir una nueva sección para la feature completada (si es nueva) o actualizar la sección existente. Detalla su operación, casos límite, validaciones y manejo de errores basándote en el código.
    - `docs/changelog.md`: Añadir una entrada bajo la sección apropiada (ej. `[Unreleased]` o la próxima versión) describiendo los cambios introducidos por la feature (Added, Changed, Fixed).
    - `docs/to_do_list.md`: Marcar como completadas las tareas pendientes que la feature haya resuelto. Añadir nuevas tareas pendientes si la feature revela o crea trabajo futuro.
    - `docs/development_notes.md`: Añadir notas relevantes sobre decisiones de diseño, desafíos superados, o detalles técnicos importantes de la feature.
    - `README.md` (Raíz): Si la feature cambia significativamente la instalación o el uso rápido, actualiza el README principal.
    - Otros documentos: Considera si la feature afecta a `docs/project_structure.md`, `docs/setup_and_installation.md`, o `docs/usage_guide.md` y actualízalos si es necesario.

**Resultado:** Presenta el contenido _actualizado_ para cada documento que haya sido modificado. El output debe ser el texto formateado en Markdown, listo para reemplazar los archivos existentes en la carpeta `/docs` (y el `README.md` en la raíz si aplica) con sus respectivos nombres.

**Consideración Adicional para el Asistente:**

- Si una feature es muy pequeña y solo afecta a una sección menor, ajusta el nivel de detalle de la actualización para que sea proporcional al cambio.
- Si no hay cambios relevantes en un documento listado en `N00_project_tracking.md` debido a la feature, indícalo.
