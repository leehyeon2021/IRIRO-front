import { useState } from "react";
import { saveRouteReview } from "../../api/routeReviewAPI";
import { deleteCookie } from "../../utils/cookie";

export default function RouteReviewModal({ onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1 || rating > 5) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      await saveRouteReview(rating);

      deleteCookie("logId");
      alert("후기가 저장되었습니다.");

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("후기 저장 실패:", error);
      alert(error.response?.data?.message || error.message || "후기 저장 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">경로 후기</h2>
        <p className="modal-text">안전 경로는 어떠셨나요?</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "20px 0" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              style={{
                fontSize: "32px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {star <= (hovered || rating) ? "⭐" : "☆"}
            </button>
          ))}
        </div>

        <p style={{ textAlign: "center", marginBottom: "16px" }}>
          선택한 점수: <strong>{rating || 0}점</strong>
        </p>

        <div className="modal-buttons">
          <button
            className="btn-modal btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            닫기
          </button>
          <button
            className="btn-modal btn-confirm"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}