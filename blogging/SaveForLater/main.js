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
      description: 'A  very well written article',
      imageSrc: '/images/post_graduation.webp',
      link: 'https://www.vox.com/even-better/23719790/post-graduation-advice-life-work-money?utm_source=facebook&utm_medium=social&utm_campaign=vox.social&utm_content=voxdotcom&fbclid=IwAR3xPXJZpAVcema7kyi_CURahLyib4URpSnO8Kr7d9UZAeLhchUoxmb5Gck',
      medium: 'Read'
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