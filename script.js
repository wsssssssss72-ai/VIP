
        // DOM Elements
        const booksGrid = document.getElementById('booksGrid');
        const searchInput = document.getElementById('searchInput');
        const filters = document.querySelectorAll('.filter-btn');
        const loading = document.getElementById('loading');
        const scrollTop = document.getElementById('scrollTop');

        // Current filter state
        let currentFilter = 'all';
        let currentSearch = '';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            displayBooks(books);
            setupEventListeners();
        });

        // Display Books
        function displayBooks(booksArray) {
            booksGrid.innerHTML = '';
            
            if (booksArray.length === 0) {
                booksGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <i class="fas fa-book" style="font-size: 3rem; color: var(--gray); margin-bottom: 1rem;"></i>
                        <h3 style="margin-bottom: 0.5rem;">No books found</h3>
                        <p style="color: var(--gray);">Try a different search or filter</p>
                    </div>
                `;
                return;
            }
            
            booksArray.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" class="book-cover">
                    <h3 class="book-title">${book.title}</h3>
                    <div class="book-author">
                        <i class="fas fa-user-edit"></i>
                        <span>${book.author}</span>
                    </div>
                    <div class="book-publisher">${book.publisher}</div>
                    <button class="download-btn" onclick="downloadBook('${book.downloadUrl}')">
                        <i class="fas fa-download"></i>
                        Download Now
                    </button>
                `;
                booksGrid.appendChild(bookCard);
            });
        }

        // Filter Books
        function filterBooks() {
            let filteredBooks = [...books];
            
            // Apply category filter
            if (currentFilter !== 'all') {
                filteredBooks = filteredBooks.filter(book => 
                    book.category === currentFilter || book.subject === currentFilter
                );
            }
            
            // Apply search filter
            if (currentSearch) {
                const searchLower = currentSearch.toLowerCase();
                filteredBooks = filteredBooks.filter(book =>
                    book.title.toLowerCase().includes(searchLower) ||
                    book.author.toLowerCase().includes(searchLower) ||
                    book.publisher.toLowerCase().includes(searchLower)
                );
            }
            
            // Update count
            document.getElementById('bookCount').textContent = filteredBooks.length + '+';
            
            // Display filtered books
            displayBooks(filteredBooks);
        }

        // Setup Event Listeners
        function setupEventListeners() {
            // Search input
            searchInput.addEventListener('input', function(e) {
                currentSearch = e.target.value;
                filterBooks();
            });

            // Filter buttons
            filters.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filters.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update current filter
                    currentFilter = this.dataset.filter;
                    
                    // Filter books
                    filterBooks();
                });
            });

            // Scroll to top
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollTop.classList.add('show');
                } else {
                    scrollTop.classList.remove('show');
                }
            });

            scrollTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Download Book Function
        function downloadBook(url) {
            // Show download animation
            const btn = event.target;
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            btn.disabled = true;
            
            // Simulate download process
            setTimeout(() => {
                window.open(url, '_blank');
                btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        }

        // Telegram button (optional)
        function openTelegram() {
            window.open('https://t.me/+roQAmujl1TRjMjE1', '_blank');
        }
        }



