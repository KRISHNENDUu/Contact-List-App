# Tria Contact List Application

A modern, responsive contact list application built with React and Tailwind CSS.

## Features

- ✅ View list of contacts in a responsive grid layout
- ✅ Search contacts by name in real-time
- ✅ Add new contacts with a modal form
- ✅ Loading states for better UX
- ✅ Empty state handling
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (faster than Create React App)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Design Decisions

1. **Mock Data**: Used hardcoded data to simulate API calls with async/await pattern
2. **Component Structure**: Separated concerns into reusable components
3. **Styling**: Chose Tailwind CSS for rapid development and consistent design
4. **UX Features**: Added loading states, empty states, and search result count
5. **Responsive Design**: Mobile-first approach with responsive grid layout

## Local Setup

1. Clone the repository:
```bash
   git clone <your-repo-url>
   cd tria-contact-list
```

2. Install dependencies:
```bash
   npm install
```

3. Run the development server:
```bash
   npm run dev
```

4. Open http://localhost:5173 in your browser

## Deployment

The application is deployed on Vercel at: [Your Deployed URL]

## Assumptions

- Contact data structure includes: id, name, email, and phone
- Search is case-insensitive and searches by name only
- New contacts are added to the top of the list
- No backend persistence (data resets on page reload)
- No validation beyond required fields for simplicity

## Future Enhancements

- Edit and delete contact functionality
- API integration with a backend
- Form validation with better error messages
- Sorting and filtering options
- Contact categories/tags