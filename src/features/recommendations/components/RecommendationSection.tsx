import { BookList } from "@/features/books/components/BookList";
import type { Book } from "@/features/books/interfaces/book.interface";

interface Props {
  title: string;
  description: string;
  icon: string;
  iconClassName?: string;
  books: Book[];
  recommendationReason: {
    text: string;
    type: "author" | "genre";
  };
}

export function RecommendationsSection({
  title,
  description,
  icon,
  iconClassName,
  books,
  recommendationReason,
}: Props) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <i className={`${icon} text-2xl ${iconClassName}`}></i>

          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <p className="text-muted-foreground">{description}</p>
      </div>

      <BookList
        books={books}
        recommendationReason={recommendationReason}
        pageSize={6}
      />
    </section>
  );
}
