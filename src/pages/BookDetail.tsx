import { useBookDetail } from "@/features/books/hooks/useBookDetail";
import { PageLoader } from "@/shared/components/ui/sections/PageLoader";

import LibraryIllustration from "../assets/illustrations/library.svg";
import CommentIllustration from "../assets/illustrations/comment.svg";
import { Button } from "@/shared/components/shadcn/button";
import { Link } from "react-router-dom";
import { CommentForm } from "@/features/books/components/CommentForm";
import { ProfilePhoto } from "@/shared/components/ui/user/ProfilePhoto";
import { CommentList } from "@/features/books/components/CommentList";

export const BookDetail = () => {
  const { book, creator, commentTree, loading } = useBookDetail();

  if (loading) {
    return <PageLoader />;
  }

  if (!book) {
    return (
      <section className="mx-auto flex flex-col gap-4">
        <img
          src={LibraryIllustration}
          alt="Library Illustration"
          className="w-md"
        />
        <h2 className="text-center text-2xl font-bold">
          ¡Libro no encontrado!
        </h2>
        <p className="text-center font-light">
          Asegurate de escribir un ID de libro correcto
        </p>
        <Button asChild size="lg" variant="outline">
          <Link to="/library">Regresar a la Librería</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="px-8 max-w-5xl flex flex-col gap-8">
      <div className="grid grid-cols-2 pb-8 border-b border-b-gray-300">
        <img
          src={book.bookCover}
          alt={`${book.title} Cover`}
          className="w-[80%] object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <h2 className="text-xl font-thin text-gray-500 mt-1">
            Escrito por:{" "}
            <span className="font-semibold">{book.authors.join(", ")}</span>
          </h2>
          <p className="text-sm font-thin text-gray-500 mt-1">
            ISBN: {book.ISBN}
          </p>
          <div className="mt-3 pb-6 border-b border-b-gray-300 flex gap-2">
            <span className="capitalize text-sm font-medium px-4 py-1 rounded-full bg-gray-950 text-white">
              {book.mainGenre.replaceAll("_", " ")}
            </span>

            {book.genres.slice(1).map((genre) => (
              <span
                key={genre}
                className="capitalize text-sm font-medium px-4 py-1 rounded-full border border-gray-700 text-gray-700"
              >
                {genre.replaceAll("_", " ").charAt(0).toUpperCase() +
                  genre.replaceAll("_", " ").substring(1)}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium">Sinopsis</h3>
            <p className="text-sm text-gray-700 font-thin mt-2">
              {book.synopsis}
            </p>
          </div>
          <Button size="lg" variant="default" className="mt-4">
            Agregar a mi Dashboard
          </Button>
          <div className="w-full max-w-md mt-6 p-4 flex gap-2 border border-gray-300 rounded-xl">
            <ProfilePhoto anotherUser={creator} />
            <div>
              <h4 className="font-medium text-xs text-gray-700">Subido por:</h4>
              <span className="font-semibold text-sm">{creator?.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-8">
        <h2 className="text-2xl font-bold">Comentarios</h2>
        <p className="text-sm text-gray-700">
          Escucha las opiniones de otros lectores y comparte la tuya sobre el
          libro <span className="font-bold">"{book.title}"</span> en MyReader
        </p>

        <CommentForm />

        {commentTree.length === 0 ? (
          <>
            <img
              src={CommentIllustration}
              alt="Comment Illustration"
              className="w-md"
            />
            <p className="text-sm">
              Todavía no hay comentarios publicados para este libro
            </p>
          </>
        ) : (
          <CommentList comments={commentTree} />
        )}
      </div>
    </section>
  );
};
