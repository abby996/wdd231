document.addEventListener('DOMContentLoaded', function() {
    // Course data
    const courses = [
        { 
            code: 'WDD 130', 
            title: 'Web Fundamentals', 
            credits: 3, 
            category: 'wdd',
            completed: false
        },
        { 
            code: 'WDD 131', 
            title: 'Dynamic Web Fundamentals', 
            credits: 3, 
            category: 'wdd',
            completed: false
        },
        { 
            code: 'WDD 231', 
            title: 'Frontend Development', 
            credits: 3, 
            category: 'wdd',
            completed: false
        },
        { 
            code: 'CSE 110', 
            title: 'Intro the to Programming ', 
            credits: 2, 
            category: 'cse',
            completed: false
        },
        { 
            code: 'CSE 111', 
            title: ' Programming with Function', 
            credits: 3, 
            category: 'cse',
            completed: false
        },
        { 
            code: 'CSE 210', 
            title: 'Programming with classes', 
            credits: 3, 
            category: 'cse',
            completed: false
        }
    ];

    // Load saved progress
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        courses.forEach(course => {
            const savedCourse = progress.find(c => c.code === course.code);
            if (savedCourse) {
                course.completed = savedCourse.completed;
            }
        });
    }

    // DOM Elements
    const coursesContainer = document.getElementById('courses-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const creditFilter = document.querySelector('.credit-filter');
    const searchInput = document.getElementById('course-search');
    const totalCreditsElement = document.getElementById('total-credits');
    const completedCreditsElement = document.getElementById('completed-credits');

    // Initialize
    displayCourses(courses);
    updateCreditTotals();

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCourses();
        });
    });

    creditFilter.addEventListener('change', filterCourses);
    searchInput.addEventListener('input', filterCourses);

    // Filter Courses
    function filterCourses() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const creditValue = creditFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        let filtered = courses.filter(course => {
            // Category filter
            if (activeFilter !== 'all' && course.category !== activeFilter) return false;
            
            // Credit filter
            if (creditValue !== 'all') {
                const [min, max] = creditValue.split('-').map(Number);
                if (max && (course.credits < min || course.credits > max)) return false;
                if (!max && course.credits < min) return false;
            }
            
            // Search filter
            if (searchTerm && !(
                course.code.toLowerCase().includes(searchTerm) || 
                course.title.toLowerCase().includes(searchTerm)
            )) return false;
            
            return true;
        });

        displayCourses(filtered);
    }

    // Display Courses
    function displayCourses(coursesToDisplay) {
        coursesContainer.innerHTML = '';
        
        coursesToDisplay.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseElement.innerHTML = `
                ${course.completed ? '<span class="completion-badge">Completed</span>' : ''}
                <h3>${course.code}</h3>
                <p>${course.title}</p>
                <p><strong>${course.credits} credits</strong></p>
                <label class="complete-toggle">
                    <input type="checkbox" ${course.completed ? 'checked' : ''} 
                           data-course="${course.code}">
                    Mark as completed
                </label>
            `;
            
            // Add event listener to checkbox
            const checkbox = courseElement.querySelector('.complete-toggle input');
            checkbox.addEventListener('change', function() {
                const courseCode = this.dataset.course;
                const course = courses.find(c => c.code === courseCode);
                if (course) {
                    course.completed = this.checked;
                    saveProgress();
                    updateCreditTotals();
                    // Update display
                    if (this.checked) {
                        courseElement.classList.add('completed');
                        courseElement.querySelector('.completion-badge').remove();
                        courseElement.insertAdjacentHTML('afterbegin', '<span class="completion-badge">Completed</span>');
                    } else {
                        courseElement.classList.remove('completed');
                        courseElement.querySelector('.completion-badge').remove();
                    }
                }
            });
            
            coursesContainer.appendChild(courseElement);
        });
    }

    // Update Credit Totals
    function updateCreditTotals() {
        const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
        const completedCredits = courses.reduce((sum, course) => 
            course.completed ? sum + course.credits : sum, 0);
        
        totalCreditsElement.textContent = totalCredits;
        completedCreditsElement.textContent = completedCredits;
    }

    // Save Progress
    function saveProgress() {
        const progress = courses.map(course => ({
            code: course.code,
            completed: course.completed
        }));
        localStorage.setItem('courseProgress', JSON.stringify(progress));
    }
});