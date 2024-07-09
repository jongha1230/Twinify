import { FaRegCommentAlt } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoEyeSharp } from "react-icons/io5";

function MusicDetailPage() {
  return (
    <main>
      <article>
        <section>
          {/* 앨범 사진, 제목, 가수, 좋아요, 댓글 수, 조회수? */}
          <div>
            {/* <Image
      src={}
      /> */}
          </div>

          <div>
            <h1>제목</h1>
            <h4>가수</h4>
            <div>
              <GoHeart />
              <span>숫자</span>
              <FaRegCommentAlt />
              <span>숫자</span>
              <IoEyeSharp />
              <span>숫자</span>
            </div>
          </div>
        </section>

        <section>
          {/* 가사, 더보기? */}
          <h2>가사</h2>
          <p>
            {/* 더보기 이 안에서, css로 */}
            내용 가져오기
          </p>
        </section>
      </article>
    </main>
  );
}

export default MusicDetailPage;
