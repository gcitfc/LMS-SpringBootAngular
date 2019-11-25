package com.gcit.lms.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcit.lms.entity.Author;
import com.gcit.lms.entity.Book;
import com.gcit.lms.entity.BookCopies;
import com.gcit.lms.entity.BookLoans;
import com.gcit.lms.entity.Borrower;
import com.gcit.lms.entity.Branch;
import com.gcit.lms.entity.Genre;
import com.gcit.lms.entity.Publisher;

@RestController
public class ManagementService {
	
	@Autowired
	AdministratorService aService;
	
	@Autowired
	LibrarianService lService;
	
	@Autowired
	BorrowerService bService;
	
	@RequestMapping(value="/readBooks", method=RequestMethod.GET, produces="application/json")
	public List<Book> readBooks(@RequestParam String searchString) throws SQLException{
		return aService.readBooksDetail(searchString);
	}
	
	@Transactional
	@RequestMapping(value="/saveBook", method=RequestMethod.POST, consumes="application/json")
	public void saveBook(@RequestBody Book book) throws SQLException, ClassNotFoundException{
		aService.saveBook(book);
	}
	
	@RequestMapping(value="/updateAuthor", method=RequestMethod.POST, consumes="application/json")
	public void updateAuthor(@RequestBody Author author) throws SQLException{
		aService.updateAuthor(author);
	}
	
	@RequestMapping(value="/readAuthorsWithBooks", method=RequestMethod.GET, produces="application/json")
	public List<Author> readAuthorsWithBooks(@RequestParam String searchString) throws SQLException{
		return aService.readAuthorsByName(searchString);
	}
	
	@RequestMapping(value="/readAuthors", method=RequestMethod.GET, produces="application/json")
	public List<Author> readAuthors(@RequestParam String searchString) throws SQLException{
		return aService.readBasicAuthorsByName(searchString);
	}
	
	@RequestMapping(value="/getLoansByBnB", method=RequestMethod.GET, produces="application/json")
	public List<BookLoans> getLoansByBnB(@RequestParam Integer cardNo, Integer branchId) throws SQLException{
		return aService.getLoansByBnB(cardNo, branchId);
	}
	
	@Transactional
	@RequestMapping(value="/updateBook", method=RequestMethod.POST, consumes="application/json")
	public String updateBook(@RequestBody Book book) throws SQLException{
		return aService.updateBook(book);
	}
	
	@Transactional
	@RequestMapping(value="/updateGenre", method=RequestMethod.POST, consumes= {"application/json", "application/xml"})
	public String updateGenre(@RequestBody Genre genre) throws SQLException{
		return aService.updateGenre(genre);
	}
	
	@RequestMapping(value="/readGenres", method=RequestMethod.GET, produces= "application/json")
	public List<Genre> readGenres(@RequestParam String searchString) throws SQLException{
		return aService.readGenres(searchString);
	}
	
	@Transactional
	@RequestMapping(value="/updatePublisher", method=RequestMethod.POST, consumes="application/json")
	public String updatePublisher(@RequestBody Publisher publisher) throws SQLException{
		return aService.updatePublisher(publisher);
	}
	
	@RequestMapping(value="/readPublishers", method=RequestMethod.GET, produces="application/json")
	public List<Publisher> readPublishers(@RequestParam String searchString) throws SQLException{
		return aService.readPublishers(searchString);
	}
	
	@Transactional
	@RequestMapping(value="/updateBranch", method=RequestMethod.POST, consumes="application/json")
	public String updateBranch(@RequestBody Branch branch) throws SQLException{
		return aService.updateBranch(branch);
	}
	
	@RequestMapping(value="/readBranches", method=RequestMethod.GET, produces="application/json")
	public List<Branch> readBranches(@RequestParam String searchString) throws SQLException{
		return aService.readBranches(searchString);
	}
	
	@Transactional
	@RequestMapping(value="/updateBorrower", method=RequestMethod.POST, consumes="application/json")
	public String updateBorrower(@RequestBody Borrower borrower) throws SQLException{
		return aService.updateBorrower(borrower);
	}
	
	@RequestMapping(value="/readBorrowers", method=RequestMethod.GET, produces="application/json")
	public List<Borrower> readBorrowers(@RequestParam String searchString) throws SQLException{
		return aService.readBorrowers(searchString);
	}
	
	@Transactional
	@RequestMapping(value="/overrideDue", method=RequestMethod.POST, consumes="application/json")
	public String overrideDue(@RequestBody BookLoans loans) throws SQLException{
		return aService.overrideDue(loans);
	}
	
	@Transactional
	@RequestMapping(value="/updateCopies", method=RequestMethod.POST, consumes="application/json")
	public String updateCopies(@RequestBody BookCopies bookcopy) throws SQLException{
		return lService.updateCopies(bookcopy);
	}
	
	@RequestMapping(value="/readBookCopies", method=RequestMethod.GET, produces="application/json")
	public List<BookCopies> readBookCopies(@RequestParam Integer branchId) throws SQLException{
		return lService.readBookCopies(branchId);
	}
	
	@RequestMapping(value="/validCardNo", method=RequestMethod.GET, produces="application/json")
	public boolean validCardNo(@RequestParam Integer cardNo) throws SQLException{
		return bService.validCardNo(cardNo);
	}
	
	@Transactional
	@RequestMapping(value="/checkOutBook", method=RequestMethod.POST, consumes="application/json")
	public String checkOutBook(@RequestBody BookLoans bl) throws SQLException{
		return bService.checkOutBook(bl);
	}
	
	@Transactional
	@RequestMapping(value="/returnBook", method=RequestMethod.POST, consumes="application/json")
	public String returnBook(@RequestBody BookLoans bl) throws SQLException{
		return bService.returnBook(bl);
	}
	
	@RequestMapping(value="/readBooksByBB", method=RequestMethod.GET, produces="application/json")
	public List<BookLoans> readBooksByBB(@RequestParam Integer cardNo, Integer branchId) throws SQLException{
		return bService.readBooksByBB(cardNo, branchId);
	}
	
}
