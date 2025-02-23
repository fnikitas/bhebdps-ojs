// task.js
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const clearBtn = document.getElementById('clearBtn');
    
    // Восстановление текста при загрузке
    const savedText = localStorage.getItem('editorContent');
    if(savedText) editor.value = savedText;
    
    // Автосохранение при вводе
    editor.addEventListener('input', () => {
        localStorage.setItem('editorContent', editor.value);
    });
    
    // Обработчик очистки
    clearBtn.addEventListener('click', () => {
        editor.value = '';
        localStorage.removeItem('editorContent');
    });
});