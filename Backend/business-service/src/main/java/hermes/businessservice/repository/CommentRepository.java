package hermes.businessservice.repository;

import hermes.businessservice.entity.Comment;
import hermes.businessservice.entity.Pheed;
import org.springframework.data.repository.CrudRepository;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    Iterable<Comment> findByPheed(Pheed pheed);

    void deleteByPheedId(Long pheedId);
}
