/**
 * JMGV-PTEL-2026
 * Controlador de Planeación Didáctica
 */

// Función principal de impresión
function printPlanner() {
	window.print();
}

// Animación de entrada "Fade-in" para las filas
document.addEventListener('DOMContentLoaded', () => {
	const rows = document.querySelectorAll('.planner-table tbody tr');
	
	// Configuración de observador para animación al hacer scroll
	const observer = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
									if (entry.isIntersecting) {
													entry.target.classList.add('visible');
									}
					});
	}, { threshold: 0.1 });

	rows.forEach((row, index) => {
					row.style.opacity = '0';
					row.style.transform = 'translateY(15px)';
					row.style.transition = 'all 0.4s ease-out';
					
					// Retardo escalonado para efecto cascada inicial
					setTimeout(() => {
									row.style.opacity = '1';
									row.style.transform = 'translateY(0)';
					}, index * 40);
					
					observer.observe(row);
	});
});