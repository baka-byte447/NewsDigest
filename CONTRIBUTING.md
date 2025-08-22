# Contributing to NewsSumm

Thank you for your interest in contributing to NewsSumm! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the [GitHub issue tracker](https://github.com/yourusername/NewsSumm/issues)
- Include a clear description of the bug
- Provide steps to reproduce
- Include your browser/OS information
- Add screenshots if applicable

### Suggesting Features
- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Consider implementation complexity
- Discuss with maintainers before starting work

### Code Contributions
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with clear messages
7. **Push** to your fork
8. **Open** a Pull Request

## 🏗️ Development Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/NewsSumm.git
cd NewsSumm

# Backend setup
cd backend
pip install -r requirements.txt
python app.py

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

## 📝 Code Standards

### Python (Backend)
- Follow PEP 8 style guidelines
- Use type hints where possible
- Add docstrings to functions
- Keep functions focused and small
- Use meaningful variable names

### JavaScript/React (Frontend)
- Follow ESLint configuration
- Use functional components with hooks
- Follow React best practices
- Use meaningful component names
- Add PropTypes for component props

### Git Commit Messages
Use conventional commit format:
```
type(scope): description

feat(auth): add GitHub OAuth integration
fix(news): resolve article loading issue
docs(readme): update installation instructions
style(ui): improve button hover effects
refactor(api): simplify news service logic
test(backend): add unit tests for news service
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python test_news_service.py
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
- Test on different browsers
- Test responsive design
- Verify OAuth flows
- Check error handling

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Responsive design works

### PR Description
- Clear description of changes
- Link to related issues
- Screenshots for UI changes
- Testing instructions
- Breaking changes noted

### Review Process
- Maintainers will review your PR
- Address feedback promptly
- Keep PRs focused and small
- Respond to review comments

## 🐛 Bug Fixes

### Priority Levels
- **High**: Security issues, crashes, data loss
- **Medium**: Core functionality broken
- **Low**: UI improvements, minor bugs

### Fix Guidelines
- Include regression tests
- Document the root cause
- Consider edge cases
- Test on multiple platforms

## ✨ Feature Development

### Feature Request Process
1. **Discussion**: Open issue for discussion
2. **Design**: Plan implementation approach
3. **Implementation**: Code the feature
4. **Testing**: Ensure quality
5. **Documentation**: Update docs
6. **Review**: Submit for review

### Feature Guidelines
- Keep features focused
- Consider backward compatibility
- Add appropriate tests
- Update documentation
- Consider performance impact

## 📚 Documentation

### What to Document
- New API endpoints
- Configuration changes
- Environment variables
- Installation steps
- Troubleshooting guides

### Documentation Standards
- Clear and concise
- Include examples
- Use proper markdown
- Keep up to date
- Add screenshots when helpful

## 🚀 Deployment

### Testing Deployment
- Test on staging environment
- Verify all features work
- Check performance metrics
- Validate OAuth flows

### Production Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Environment variables set
- [ ] Database migrations (if any)
- [ ] Performance tested
- [ ] Security reviewed

## 🆘 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and help
- **Pull Requests**: Code review and feedback

### Before Asking for Help
- Check existing issues and discussions
- Search documentation
- Try to reproduce the issue
- Provide clear information

## 🎯 Contribution Areas

### High Priority
- Bug fixes and stability improvements
- Security enhancements
- Performance optimizations
- Documentation improvements

### Medium Priority
- New features (discuss first)
- UI/UX improvements
- Testing coverage
- Code refactoring

### Low Priority
- Cosmetic changes
- Experimental features
- Nice-to-have improvements

## 📈 Recognition

### Contributor Benefits
- Recognition in README
- Contributor badge
- Early access to features
- Direct communication with maintainers

### Contribution Levels
- **Bronze**: 1-5 contributions
- **Silver**: 6-20 contributions
- **Gold**: 21+ contributions
- **Platinum**: Major contributions

## 📄 License

By contributing to NewsSumm, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to NewsSumm! 🎉**

Your contributions help make this project better for everyone.
