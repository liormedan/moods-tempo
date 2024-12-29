# MyMoney-tempo

אפליקציית מעקב מצב רוח עם ממשק נקי ומינימליסטי המאפשר למשתמשים לעקוב ולתעד את מצב הרוח היומי שלהם.

## תכונות עיקריות

- מערכת דירוג אינטואיטיבית (😊 😐 😢 😡) עם סולם 1-10
- לוח שנה צבעוני להצגת היסטוריית מצבי רוח
- שדה טקסט להערות והקשר
- סטטיסטיקות ומגמות

## טכנולוגיות

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- shadcn/ui

## התקנה

```bash
# התקנת תלויות
npm install

# הרצת סביבת פיתוח
npm run dev

# בנייה לייצור
npm run build
```

## משתני סביבה

צור קובץ `.env` בתיקיית הפרויקט:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## רישיון

MIT
