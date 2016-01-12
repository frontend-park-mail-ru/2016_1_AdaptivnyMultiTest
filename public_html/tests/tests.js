QUnit.test('проверяем корректную работу начального окна', function( assert ) {
	assert.ok( typeof showMainScreen === "function", "фунция определенна" );

	window.$page = $('<div></div>');
	showMainScreen();

	assert.ok(window.$page.find('#main').length === 1);
});
