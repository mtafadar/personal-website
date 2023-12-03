// Sample data for saved items (replace this with your data)
const savedItems = [
    {
      category: 'general',
      title: '2023 Class Day Keynote Address: Sanjay Gupta',
      description: 'A video about kindness, passion and life in general',
      imageSrc: '/images/Sanjay.jpeg',
      link: 'https://www.youtube.com/watch?v=Dz9IB7zXf0E&ab_channel=HarvardMedicalSchool',
      medium: 'Watch'
    },
  
    {
      category: 'general',
      title: 'Post-graduation advice you’ll actually use',
      description: 'A  very well written article about post-graduation advice',
      imageSrc: '/images/post_graduation.webp',
      link: 'https://www.vox.com/even-better/23719790/post-graduation-advice-life-work-money?utm_source=facebook&utm_medium=social&utm_campaign=vox.social&utm_content=voxdotcom&fbclid=IwAR3xPXJZpAVcema7kyi_CURahLyib4URpSnO8Kr7d9UZAeLhchUoxmb5Gck',
      medium: 'Read'
    },

    {
      category: 'movies',
      title: 'Oppenheimer',
      description: "I watched Oppenheimer on July 1, 2023, at AMC IMAX. I didnt know much about Oppenheimer as a scientist before seeing the movie, but I found it fascinating. The story of how the first nuclear weapon came to light was truly gripping. As a fan of historical science movies, I loved how the film showed how even the purest intentions can have negative consequences.",
      imageSrc: '/images/oppenheimer.jpg',
      link: 'https://www.newyorker.com/culture/the-front-row/oppenheimer-is-ultimately-a-history-channel-movie-with-fancy-editing',
      medium: 'Read more about Oppenheimer'
    }, 

    {
    category: 'general',
    title: 'Create a Growth Culture, Not a Performance-Obsessed One',
    description: 'A  very well written article about career and performance ',
    imageSrc: '/images/careerPerformance.jpeg',
    link: 'https://hbr.org/2018/03/create-a-growth-culture-not-a-performance-obsessed-one?utm_medium=social&utm_campaign=hbr&utm_source=facebook&tpcc=orgsocial_edit&fbclid=IwAR0gjlP6kXSWFey6rVVJAqC63GOuJvR0HWg7jWwo2aEZu0lIQyAmIKvcp8Q',
    medium: 'Read'
  },

  {
    category: 'tech',
    title: 'The Exciting, Perilous Journey Toward AGI | Ilya Sutskever | TED',
    description: 'It talks about AGI and what impact it will have in future. Fascinating talk',
    imageSrc: '/images/Agi.jpeg',
    link: 'https://www.youtube.com/watch?v=SEkGLj0bwAU&ab_channel=TED',
    medium: 'Watch'
  }




  ];
  
  // Function to display saved items for the selected category
  function showSavedItems(category) {
    const savedItemsContainer = document.querySelector('.saved-items');
    savedItemsContainer.innerHTML = ''; // Clear existing saved items
  
    savedItems.forEach((item) => {
      if (item.category === category) {
        const savedItemCard = document.createElement('div');
        savedItemCard.classList.add('saved-item-card');
  
        const thumbnail = document.createElement('img');
        thumbnail.src = item.imageSrc;
        thumbnail.alt = item.title;
  
        const title = document.createElement('h3');
        title.textContent = item.title;
  
        const description = document.createElement('p');
        description.textContent = item.description;
  
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.medium; // Change text to "Watch Video" or something appropriate for videos
  
        savedItemCard.appendChild(thumbnail);
        savedItemCard.appendChild(title);
        savedItemCard.appendChild(description);
        savedItemCard.appendChild(link);
  
        savedItemsContainer.appendChild(savedItemCard);
      }
    });
  }
  
  // Add event listeners to the category tabs
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove the "active" class from all tabs
      categoryTabs.forEach((tab) => tab.classList.remove('active'));
  
      // Add the "active" class to the clicked tab
      tab.classList.add('active');
  
      // Get the category associated with the clicked tab
      const selectedCategory = tab.dataset.category;
  
      // Display saved items for the selected category
      showSavedItems(selectedCategory);
    });
    

  });
  
  // Show saved items for the initial active category (e.g., "General")
  showSavedItems('general');