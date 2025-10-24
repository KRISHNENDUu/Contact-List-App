# Contact List Application (Tria Assignment)

[cite_start]This is a modern, responsive contact list application built using React and Tailwind CSS[cite: 25, 17]. [cite_start]It was developed as part of the Tria Assignment to assess frontend development skills, particularly with React, component design, and product sense[cite: 36].

## Deployed Application

[cite_start]The application is deployed at: **[Your Deployed URL Here]** 

## Features

[cite_start]This application includes the following features: [cite: 37]

-   [cite_start]✅ **View Contacts:** Display a list of all contacts in a clean, responsive layout[cite: 38, 17].
-   [cite_start]✅ **Search Contacts:** Filter contacts in real-time by typing a name into the search bar[cite: 39, 17].
-   [cite_start]✅ **Add New Contact:** Add new contacts to the list via a modal form[cite: 40, 17]. Added contacts are persisted using browser `localStorage`.
-   ✅ **Simulated Actions:** Interactive modals simulate placing calls, sending messages, and starting video calls, complete with dialing sound effects.
-   [cite_start]✅ **UX Enhancements:** Includes empty state handling (for no contacts or no search results), subtle animations for interactions, and a clear visual hierarchy[cite: 59, 17].
-   [cite_start]✅ **Responsive Design:** Adapts smoothly to various screen sizes (mobile, tablet, desktop).
-   ✅ **Persistent Added Contacts:** Contacts added by the user are saved locally and reappear after refreshing the page.

## Tech Stack & Libraries

-   [cite_start]**React 19:** The core UI library, mandated by the assignment[cite: 45, 25]. Chosen for its component-based architecture and ecosystem.
-   [cite_start]**Vite:** Next-generation frontend tooling for a fast development experience and optimized builds[cite: 25, 17].
-   [cite_start]**Tailwind CSS:** A utility-first CSS framework used for rapid UI development and consistent styling[cite: 49, 25, 17].
-   [cite_start]**Lucide React:** A clean and consistent icon library used for UI elements[cite: 25, 17].

[cite_start]*(Reasoning for library choices included above as requested by the PDF)* [cite: 57]

## Local Setup

[cite_start]To set up and run the project locally: [cite: 55]

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/KRISHNENDUu/Contact-List-App.git
    cd Contact-List-App
    ```
    *(Replace placeholders with your actual repository URL and folder name)*

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    [cite_start][cite: 17]

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    [cite_start][cite: 17]

4.  **Open the Application:**
    [cite_start]Navigate to `http://localhost:5173` (or the port specified in your terminal) in your web browser.

## Design Choices & Assumptions

[cite_start][cite: 56, 61]

-   [cite_start]**Data Fetching:** API interaction is mimicked using hardcoded mock data located in `src/data/contacts.js`[cite: 47, 13, 17]. No actual API calls are made.
-   **Data Persistence:** Only *newly added* contacts are persisted using the browser's `localStorage`. The initial mock data is loaded on every visit but is not saved back to `localStorage`. [cite_start]Data is lost if the user clears their browser storage.
-   **UI/UX:**
    -   [cite_start]Focused on a clean, modern aesthetic using Tailwind CSS utilities and custom animations[cite: 9, 49].
    -   [cite_start]Contact addition is handled via a Floating Action Button (FAB) triggering a modal[cite: 15].
    -   [cite_start]Call/Message/Video actions open detailed simulation modals rather than invoking native device functions.
    -   [cite_start]Avatar colors are generated based on the contact's name for visual distinction[cite: 11].
-   [cite_start]**Search:** Implemented as a simple, case-insensitive filter on the contact `name` field only[cite: 39, 17].
-   [cite_start]**Error Handling:** Basic `try...catch` blocks are used for `localStorage` parsing and saving, but comprehensive error handling (e.g., for failed audio playback) is minimal[cite: 59].
-   **Form Validation:** The "Add Contact" form requires a name, and either an email or a phone number. [cite_start]No complex validation patterns are enforced[cite: 15].
-   [cite_start]**Ambiguity:** Where requirements were open to interpretation (e.g., specific UI interactions, detailed functionality of action modals), sensible decisions were made based on standard UX patterns and engineering judgment[cite: 59, 60].

## AI Usage Policy

[cite_start]AI tools were utilized during the development of this assignment[cite: 63]. [cite_start]However, the final submitted code represents my own understanding, implementation of best practices, and coding style[cite: 64]. [cite_start]I am prepared to explain the code, design choices, and how AI assistance was leveraged[cite: 65]. [cite_start]The quality, correctness, and maintainability of the final code remain my responsibility[cite: 66].

## Future Enhancements

Potential improvements for future versions include:

-   [cite_start]Edit and Delete contact functionality.
-   [cite_start]Integration with a real backend API for data management.
-   [cite_start]More robust form validation with user feedback.
-   [cite_start]Advanced sorting and filtering options (e.g., by date added).
-   [cite_start]Contact categorization or tagging.