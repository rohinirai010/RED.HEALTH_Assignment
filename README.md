* Commenting System

* Tech Stack
Next.js 14+ - React framework with App Router
TypeScript - Type-safe development
Tailwind CSS - Utility-first styling
Lucide React - Icon library

* Features
1. Add comments with user selection
2. Sort comments (Newest/Oldest)
3. Fully responsive design
4. Clean, reusable components
5. Type-safe with TypeScript

* Performance
1. React.memo on CommentCard - Individual cards only re-render when their props change, crucial for performance with large lists
2. useMemo for sorting - Expensive sort operation only runs when comments or sort order changes
3. useCallback for handlers - Prevents function recreation and unnecessary child re-renders
4. Custom dropdown - Better styling control and consistency across browsers
5. Mobile-first responsive - Ensures great experience on all devices