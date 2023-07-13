export const navLinks = [
  {
    id: 1,
    name: 'Home',
    icon: 'bx bxs-folder',
    path: '/'
  },
  {
    id: 2,
    name: 'About',
    icon: 'bx bxs-folder',
    path: '/about',
    children: [
      {
        id: 1,
        name: 'Skills',
        icon: 'bx bxs-joystick',
        path: '/skills'
      },
      {
        id: 2,
        name: 'Projects',
        icon: 'bx bx-briefcase',
        path: '/projects'
      },
      {
        id: 3,
        name: 'Experience',
        icon: 'bx bxs-graduation',
        path: '/experience'
      },
      {
        id: 4,
        name: 'Social Media',
        icon: 'bx bxl-twitter',
        path: '/socials'
      }
    ]
  },
  {
    id: 3,
    name: 'Blog',
    icon: 'bx bxs-folder',
    path: '/blog',
    children: [
      {
        id: 1,
        name: 'Editor',
        icon: 'bx bx-add-to-queue',
        path: '/add-post'
      }
    ]
  }
]
